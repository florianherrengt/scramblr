import { GetCurrentUserAction } from './fetchUser';
import { SignInAction } from './signIn';
import { AesPassphraseAction } from './aesPassphrase';

export * from './aesPassphrase';
export * from './signIn';
export * from './signUp';
export * from './signOut';
export * from './fetchUser';
export * from './resendConfirmEmail';
export * from './updateEmail';

export type UserAction =
    | GetCurrentUserAction
    | SignInAction
    | AesPassphraseAction;
