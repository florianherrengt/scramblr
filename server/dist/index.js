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
require('dotenv').config();
const config = require("config");
const http = require("http");
const https = require("https");
require("reflect-metadata");
require("./helpers/containers");
const app_1 = require("./app");
const helpers_1 = require("./helpers");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 8080;
    const { serviceKey, certificate } = yield helpers_1.generateHttpsCertificate();
    const app = yield app_1.createApp();
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.info(`🚀 http server listening on  http://localhost:${port}`);
    });
    if (config.get('Env') === 'development') {
        const httpsServer = https.createServer({ key: serviceKey, cert: certificate }, app);
        httpsServer.listen(8081, () => {
            console.info(`🔒https server listening on  https://localhost:8081`);
        });
    }
}))();
//# sourceMappingURL=index.js.map