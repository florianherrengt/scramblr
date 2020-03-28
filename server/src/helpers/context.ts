import { getRepository } from 'typeorm';
import { User } from '../entities';
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
    const userRepository = getRepository(User);
    const context = { request };
    if (request.session?.username) {
        const user = await userRepository.findOne(request.session.username);
        Object.assign(context, { user });
    }
    return context;
};
