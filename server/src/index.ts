require('dotenv').config();

import 'reflect-metadata';
import * as config from 'config';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as pem from 'pem';
import { createApp } from './app';

(async () => {
    const port = process.env.PORT || 8080;
    const {
        serviceKey,
        certificate,
    }: pem.CertificateCreationResult = await new Promise((resolve, reject) =>
        pem.createCertificate({ selfSigned: true }, (error, keys) =>
            error ? reject(error) : resolve(keys),
        ),
    );
    const app = await createApp();
    const server =
        config.get('Env') === 'development'
            ? https.createServer({ key: serviceKey, cert: certificate }, app)
            : http.createServer(app);
    server.listen(port, () => {
        console.info(`server listening on  http://localhost:${port}`);
    });
})();
