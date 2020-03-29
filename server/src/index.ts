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
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.info(`http server listening on  http://localhost:${port}`);
    });
    if (config.get('Env') === 'development') {
        const httpsServer = https.createServer(
            { key: serviceKey, cert: certificate },
            app,
        );
        httpsServer.listen(8081, () => {
            console.info(`https server listening on  https://localhost:8081`);
        });
    }
})();
