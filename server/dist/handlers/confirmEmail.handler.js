"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
exports.confirmEmailHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email } = jwt.verify(request.param('token'), config.get('Jwt.secret'));
        const userRepository = typeorm_1.getRepository(entities_1.User);
        const user = yield userRepository.findOne({
            username: (_a = request.session) === null || _a === void 0 ? void 0 : _a.username,
            email,
        });
        if (!user) {
            return response.redirect('/sign-in');
        }
        user.emailConfirmed = true;
        yield userRepository.save(user);
        response.redirect('/settings');
    }
    catch (error) {
        response.status(500).send(error);
    }
});
//# sourceMappingURL=confirmEmail.handler.js.map