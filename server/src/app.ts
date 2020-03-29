import { ApolloServer } from 'apollo-server-express';
import * as config from 'config';
import * as connectRedis from 'connect-redis';
import * as express from 'express';
import * as session from 'express-session';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as multer from 'multer';
import * as path from 'path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { Note, Tag, User } from './entities';
import { exportRouter } from './exportRouter';
import {
    InsightResolver,
    NoteResolver,
    TagResolver,
    UserResolver,
} from './graphql/resolvers';
import {
    createContext,
    getDbConnectionOptions,
    PopulateDemo,
    redisClient,
    AppRoutes,
} from './helpers';
import { importRouter } from './importRouter';
import { confirmEmailHandler } from './handlers';

const RedisStore = connectRedis(session);

const upload = multer({ dest: 'uploads/', limits: { fileSize: 10000000 } });

export const createApp = async () => {
    const app = express();
    app.set('trust proxy', 1);
    app.use(
        session({
            secret: config.get('Jwt.secret'),
            store: new RedisStore({ client: redisClient }),
            cookie: { httpOnly: true, secure: false },
            saveUninitialized: true,
            resave: false,
        }),
    );

    TypeORM.useContainer(Container);

    const connection = await TypeORM.createConnection({
        ...getDbConnectionOptions(),
        synchronize: true,
        entities: [User, Note, Tag],
    });

    const schema = await buildSchema({
        resolvers: [UserResolver, NoteResolver, TagResolver, InsightResolver],
        container: Container,
    });

    if (parseInt(config.get('Populate.demo'), 10)) {
        const populateDemo = new PopulateDemo(
            connection,
            TypeORM.getRepository(Note),
            TypeORM.getRepository(User),
            TypeORM.getRepository(Tag),
        );
        await populateDemo.populate();
    }

    const apolloServer = new ApolloServer({
        schema,
        tracing: true,
        context: async ({ req }) => {
            const context = await createContext({
                request: req,
            });
            return { ...context };
        },
    });

    apolloServer.applyMiddleware({ app, path: '/api/graphql' });

    app.use('/healthz', (_, response) => {
        response.sendStatus(200);
    });

    app.get(AppRoutes.confirmEmail, confirmEmailHandler);

    app.get('/api/export/:entity', exportRouter);
    app.use('/api/import/:entity', upload.single('data'), importRouter);

    app.get('/', (_, res) => {
        res.sendFile(path.join(__dirname + '/../assets/landing/index.html'));
    });
    app.use('/landing*', (request, response) => {
        response.sendFile(
            path.join(__dirname + '/../assets/landing', request.originalUrl),
        );
    });

    if (config.get('Env') === 'development') {
        app.use(
            '*',
            createProxyMiddleware({
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws: true,
                logLevel: 'error',
            }),
        );
    } else {
        app.use(express.static('assets'));
        app.get('*', (_, response) => {
            response.sendFile(path.join(__dirname + '/../assets/index.html'));
        });
    }
    return app;
};
