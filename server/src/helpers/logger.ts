import * as config from 'config';
import * as pino from 'pino';

const logger = pino({
    prettyPrint: config.get('Env') !== 'production',
});

export const getLogger = (from: string) => {
    return logger.child({ from });
};
