import { Request } from 'express';

export interface AppContext {
    user?: { username: string };
    request: Request;
}

export const createContext = async ({
    request,
}: {
    request: Request;
}): Promise<AppContext> => {
    const context = { request };
    if (request.session?.username) {
        Object.assign(context, {
            user: { username: request.session.username },
        });
    }
    return context;
};
