"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const pem = require("pem");
exports.generateHttpsCertificate = () => new Promise((resolve, reject) => {
    if (fs.existsSync(path.join(__dirname, '../../httpsCertificate'))) {
        resolve(JSON.parse(fs.readFileSync(path.join(__dirname, '../../httpsCertificate'), 'utf8')));
        return;
    }
    pem.createCertificate({ selfSigned: true, emailAddress: 'contact@dev.com' }, (error, keys) => {
        if (error) {
            reject(error);
            return;
        }
        fs.writeFileSync(path.join(__dirname, '../../httpsCertificate'), JSON.stringify(keys), { encoding: 'utf8' });
        resolve(keys);
        return;
    });
});
//# sourceMappingURL=generateHttpsCertificate.js.map