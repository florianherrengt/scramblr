import { Request } from 'express';

export const appSession = {
    async setUsername({
        session,
        username,
    }: {
        session?: Request['session'];
        username: string;
    }) {
        return await new Promise((resolve, reject) => {
            if (session) {
                session.username = username;
                session.save((error) => (error ? reject(error) : resolve()));
            } else {
                reject('session is not defined');
            }
        });
    },
    async destroy({ session }: { session?: Request['session'] }) {
        return await new Promise((resolve, reject) => {
            if (session) {
                session.destroy((error) => (error ? reject(error) : resolve()));
            } else {
                reject('session is not defined');
            }
        });
    },
};
