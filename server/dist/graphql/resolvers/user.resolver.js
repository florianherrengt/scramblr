"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const apollo_server_express_1 = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const user_entity_1 = require("../../entities/user.entity");
const user_input_1 = require("../inputs/user.input");
const helpers_1 = require("../../helpers");
let UserResolver = class UserResolver {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    userExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(username);
            return !!user;
        });
    }
    currentUser(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = context.user || {};
            if (!username) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const user = yield this.userRepository.findOne({ username });
            return user;
        });
    }
    signIn(input, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { username: input.username },
            });
            if (!user || !bcrypt.compareSync(input.password, user.password)) {
                throw new apollo_server_express_1.UserInputError('Incorrect username/password');
            }
            const { session } = context.request;
            yield helpers_1.appSession.setUsername({ session, username: user.username });
            return helpers_1.createJwt(user);
        });
    }
    signUp(input, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(config.get('App.registrationDisabled'))) {
                throw new Error('Registration disabled');
            }
            if (yield this.userRepository.findOne(input.username)) {
                throw new Error('Username already exists');
            }
            const newUser = this.userRepository.create(Object.assign(Object.assign({}, input), { password: bcrypt.hashSync(input.password) }));
            yield this.userRepository.save(newUser);
            if (!newUser) {
                throw new Error('cannot create new user');
            }
            const { session } = context.request;
            yield helpers_1.appSession.setUsername({ session, username: newUser.username });
            return helpers_1.createJwt(newUser);
        });
    }
    signOut(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { session } = context.request;
            yield helpers_1.appSession.destroy({ session });
            return true;
        });
    }
    updateEmail(input, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = context.user || {};
            if (!username) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const user = yield this.userRepository.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.email && user.emailConfirmed) {
                throw new Error('Cannot change email');
            }
            user.emailConfirmed = user.email === input.email;
            user.email = input.email;
            yield this.userRepository.save(user);
            yield helpers_1.sendConfirmEmail(user);
            return user;
        });
    }
    resendConfirmEmail(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = context.user || {};
            if (!username) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const user = yield this.userRepository.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.emailConfirmed) {
                throw new Error('Email already confirmed');
            }
            yield helpers_1.sendConfirmEmail(user);
            return user;
        });
    }
    deleteAccount(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = context;
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            try {
                yield this.userRepository.delete(user.username);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query((returns) => type_graphql_1.Int, { nullable: false }),
    __param(0, type_graphql_1.Arg('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userExists", null);
__decorate([
    type_graphql_1.Query((returns) => user_entity_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "currentUser", null);
__decorate([
    type_graphql_1.Mutation((returns) => String, { nullable: true }),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.SignInInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signIn", null);
__decorate([
    type_graphql_1.Mutation((returns) => String),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.SignUpInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signUp", null);
__decorate([
    type_graphql_1.Mutation((returns) => type_graphql_1.Int),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signOut", null);
__decorate([
    type_graphql_1.Mutation((returns) => user_entity_1.User),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UpdateEmailInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateEmail", null);
__decorate([
    type_graphql_1.Mutation((returns) => user_entity_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "resendConfirmEmail", null);
__decorate([
    type_graphql_1.Mutation((returns) => type_graphql_1.Int),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteAccount", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(user_entity_1.User),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map