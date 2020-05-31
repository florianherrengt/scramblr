"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const compression = require("compression");
const config = require("config");
const connectRedis = require("connect-redis");
const cors = require("cors");
const dateFns = require("date-fns");
const express = require("express");
const session = require("express-session");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const TypeORM = require("typeorm");
const entities_1 = require("./entities");
const exportRouter_1 = require("./exportRouter");
const resolvers_1 = require("./graphql/resolvers");
const handlers_1 = require("./handlers");
const helpers_1 = require("./helpers");
const importRouter_1 = require("./importRouter");
const RedisStore = connectRedis(session);
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10000000 } });
exports.createApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    app.use(cors());
    app.use(morgan(':method :url :status - :response-time ms', {
        skip: function (req, res) {
            return res.statusCode < 400;
        },
    }));
    app.set('trust proxy', 1);
    // app.use(helmet());
    // app.use(helmet.xssFilter());
    // app.use(noCache());
    // app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
    // app.use(featurePolicyMiddleware);
    app.use(compression({ level: 9 }));
    app.use(session({
        secret: config.get('Jwt.secret'),
        store: new RedisStore({ client: helpers_1.redisClient }),
        cookie: {
            expires: dateFns.addYears(new Date(), 1),
            httpOnly: true,
            secure: config.get('App.protocol') === 'https',
        },
        saveUninitialized: true,
        resave: false,
    }));
    TypeORM.useContainer(typedi_1.Container);
    const connection = yield TypeORM.createConnection(Object.assign(Object.assign({}, helpers_1.getDbConnectionOptions()), { synchronize: true, entities: [entities_1.User, entities_1.Note, entities_1.Tag, entities_1.Mood] }));
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [
            resolvers_1.UserResolver,
            resolvers_1.NoteResolver,
            resolvers_1.TagResolver,
            resolvers_1.InsightResolver,
            resolvers_1.PaymentResolver,
            resolvers_1.MoodResolver,
        ],
        container: typedi_1.Container,
    });
    if (parseInt(config.get('Populate.demo'), 10)) {
        const populateDemo = new helpers_1.PopulateDemo(connection, TypeORM.getRepository(entities_1.Note), TypeORM.getRepository(entities_1.User), TypeORM.getRepository(entities_1.Tag));
        yield populateDemo.populate();
    }
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        tracing: true,
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const context = yield helpers_1.createContext({
                request: req,
            });
            return Object.assign({}, context);
        }),
    });
    apolloServer.applyMiddleware({ app, path: '/api/graphql' });
    app.use('/healthz', (_, response) => {
        response.sendStatus(200);
    });
    app.get(helpers_1.AppRoutes.confirmEmail, handlers_1.confirmEmailHandler);
    app.get('/api/export/:entity', exportRouter_1.exportRouter);
    app.use('/api/import/:entity', upload.single('data'), importRouter_1.importRouter);
    app.get(helpers_1.AppRoutes.paymentSuccess, handlers_1.stripePaymentSuccessHandler);
    // app.get('/', (_, res) => {
    //     res.sendFile(path.join(__dirname + '/../assets/landing/index.html'));
    // });
    // app.use('/landing*', (request, response) => {
    //     response.sendFile(
    //         path.join(__dirname + '/../assets/landing', request.originalUrl),
    //     );
    // });
    if (config.get('Env') === 'development') {
        app.use('*', http_proxy_middleware_1.createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
            ws: true,
            logLevel: 'error',
        }));
    }
    else {
        app.use(express.static('assets'));
        app.get('*', (_, response) => {
            response.sendFile(path.join(__dirname + '/../assets/index.html'));
        });
    }
    return app;
});
//# sourceMappingURL=app.js.map