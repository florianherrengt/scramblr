import CryptoJS from 'crypto-js';

export const encrypt = (str: string, secret: string): string => {
    return CryptoJS.AES.encrypt(str, secret).toString();
};

export const decrypt = (str: string, secret: string): string => {
    try {
        const decrypted = CryptoJS.AES.decrypt(
            decodeURIComponent(str),
            secret,
        ).toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            return 'Invalid passphrase';
        }
        return decrypted;
    } catch (error) {
        console.error(error);
        return 'Invalid passphrase';
    }
};
