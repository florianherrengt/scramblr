require('dotenv').config();

import * as config from 'config';
import * as http from 'http';
import * as https from 'https';
import 'reflect-metadata';
import { createApp } from './app';
import { generateHttpsCertificate } from './helpers';

(async () => {
    const port = process.env.PORT || 8080;

    const { serviceKey, certificate } = await generateHttpsCertificate();
    const app = await createApp();
    const server =
        config.get('Env') === 'development'
            ? https.createServer({ key: serviceKey, cert: certificate }, app)
            : http.createServer(app);
    server.listen(port, () => {
        console.info(`server listening on  http://localhost:${port}`);
    });
})();
