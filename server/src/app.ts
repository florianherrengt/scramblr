import * as config from 'config';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import * as jwt from 'jsonwebtoken';
import { User, Note, Tag } from './entities';
import {
    NoteResolver,
    UserResolver,
    TagResolver,
    InsightResolver,
} from './graphql/resolvers';
import {
    PopulateDemo,
    JwtObject,
    createContext,
    getDbConnectionOptions,
} from './helpers';
import * as cors from 'cors';
import * as path from 'path';
import * as session from 'express-session';
import { exportRouter } from './exportData';

export const createApp = async () => {
    const app = express();
    app.set('trust proxy', 1);
    app.use(
        session({
            secret: config.get('Jwt.secret'),
            cookie: { httpOnly: true, secure: false },
            saveUninitialized: true,
        }),
    );
    // app.use((request, _, next) => {
    //     console.log(request.session?.username);
    //     request.session!.username = 'sdf';
    //     request.session?.save(next);
    // });
    app.use(cors());
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

    app.use('/api/export/:entity', exportRouter);

    app.use(express.static(path.join(__dirname + '/../assets')));
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname + '/../assets/index.html'));
    });
    return app;
};
