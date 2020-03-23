import { getRepository } from 'typeorm';
import { User } from '../entities';
export interface AppContext {
    user?: { username: string };
}

export const createContext = async ({ username }: { username: string }) => {
    const userRepository = getRepository(User);
    const context = {};
    if (username) {
        const user = await userRepository.findOne(username);
        Object.assign(context, { user });
    }
    return context;
};
