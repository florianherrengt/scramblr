import { ApolloServer } from 'apollo-server-express';
import * as compression from 'compression';
import * as config from 'config';
import * as connectRedis from 'connect-redis';
import * as dateFns from 'date-fns';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as morgan from 'morgan';
import * as multer from 'multer';
import * as noCache from 'nocache';
import * as path from 'path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { Note, Tag, User } from './entities';
import { exportRouter } from './exportRouter';
import {
    InsightResolver,
    NoteResolver,
    PaymentResolver,
    TagResolver,
    UserResolver,
} from './graphql/resolvers';
import { confirmEmailHandler, stripePaymentSuccessHandler } from './handlers';
import {
    AppRoutes,
    createContext,
    getDbConnectionOptions,
    PopulateDemo,
    redisClient,
} from './helpers';
import { importRouter } from './importRouter';
import {
    contentSecurityPolicyMiddleware,
    featurePolicyMiddleware,
} from './middlewares';

const RedisStore = connectRedis(session);

const upload = multer({ dest: 'uploads/', limits: { fileSize: 10000000 } });

export const createApp = async () => {
    const app = express();
    app.use(
        morgan(':method :url :status - :response-time ms', {
            skip: function (req, res) {
                return res.statusCode < 400;
            },
        }),
    );

    app.set('trust proxy', 1);

    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(noCache());
    app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
    app.use(contentSecurityPolicyMiddleware);
    app.use(featurePolicyMiddleware);

    app.use(compression({ level: 9 }));
    app.use(
        session({
            secret: config.get('Jwt.secret'),
            store: new RedisStore({ client: redisClient }),
            cookie: {
                expires: dateFns.addYears(new Date(), 1),
                httpOnly: true,
                secure: config.get('App.protocol') === 'https',
            },
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
        resolvers: [
            UserResolver,
            NoteResolver,
            TagResolver,
            InsightResolver,
            PaymentResolver,
        ],
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
    app.get(AppRoutes.paymentSuccess, stripePaymentSuccessHandler);

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
