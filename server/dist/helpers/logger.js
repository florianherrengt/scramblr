"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const pino = require("pino");
const logger = pino({
    prettyPrint: config.get('Env') !== 'production',
});
exports.getLogger = (from) => {
    return logger.child({ from });
};
//# sourceMappingURL=logger.js.map