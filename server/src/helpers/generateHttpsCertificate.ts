import * as fs from 'fs';
import * as path from 'path';
import * as pem from 'pem';

export const generateHttpsCertificate = () =>
    new Promise<pem.CertificateCreationResult>((resolve, reject) => {
        if (fs.existsSync(path.join(__dirname, '../../httpsCertificate'))) {
            resolve(
                JSON.parse(
                    fs.readFileSync(
                        path.join(__dirname, '../../httpsCertificate'),
                        'utf8',
                    ),
                ),
            );
            return;
        }
        pem.createCertificate(
            { selfSigned: true, emailAddress: 'contact@dev.com' },
            (error, keys) => {
                if (error) {
                    reject(error);
                    return;
                }
                fs.writeFileSync(
                    path.join(__dirname, '../../httpsCertificate'),
                    JSON.stringify(keys),
                    { encoding: 'utf8' },
                );
                resolve(keys);
                return;
            },
        );
    });
