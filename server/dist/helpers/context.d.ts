import { Request } from 'express';
export interface AppContext {
    user?: {
        username: string;
    };
    request: Request;
}
export declare const createContext: ({ request, }: {
    request: Request<import("express-serve-static-core").ParamsDictionary>;
}) => Promise<AppContext>;
