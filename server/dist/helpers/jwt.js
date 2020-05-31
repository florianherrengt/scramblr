"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config = require("config");
exports.createJwt = (user) => {
    if (!user.username) {
        throw new Error('Jwt needs a username');
    }
    const jwtContent = { username: user.username };
    return jwt.sign(jwtContent, config.get('Jwt.secret'));
};
//# sourceMappingURL=jwt.js.map