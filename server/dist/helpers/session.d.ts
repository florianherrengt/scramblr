/// <reference types="express-session" />
export declare const appSession: {
    setUsername({ session, username, }: {
        session?: Express.Session | undefined;
        username: string;
    }): Promise<unknown>;
    destroy({ session }: {
        session?: Express.Session | undefined;
    }): Promise<unknown>;
};
