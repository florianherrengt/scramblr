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
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const entities_1 = require("../../entities");
const tag_input_1 = require("../inputs/tag.input");
let TagResolver = class TagResolver {
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    }
    currentUserTags(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.ForbiddenError('User not logged in');
            }
            const { username } = context.user;
            return this.tagRepository.find({
                where: { user: { username } },
            });
        });
    }
    createTag(input, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const newTag = this.tagRepository.create(Object.assign(Object.assign({}, input), { user: context.user }));
            yield this.tagRepository.save(newTag);
            return newTag;
        });
    }
    updateTag(tag, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const { user } = context;
            yield this.tagRepository.update({ id: tag.id }, Object.assign(Object.assign({}, tag), { user }));
            return this.tagRepository.findOne(tag.id);
        });
    }
    deleteTag(id, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const { user } = context;
            const tag = yield this.tagRepository.findOne(id);
            if (!tag) {
                throw new Error(`Tag with id ${id} does not exist`);
            }
            yield this.tagRepository.delete({ id, user });
            return tag;
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => [entities_1.Tag]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "currentUserTags", null);
__decorate([
    type_graphql_1.Mutation(returns => entities_1.Tag),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_input_1.CreateTagInput, Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "createTag", null);
__decorate([
    type_graphql_1.Mutation(returns => entities_1.Tag),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_input_1.UpdateTagInput, Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "updateTag", null);
__decorate([
    type_graphql_1.Mutation(returns => entities_1.Tag),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "deleteTag", null);
TagResolver = __decorate([
    type_graphql_1.Resolver(entities_1.Tag),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(entities_1.Tag)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TagResolver);
exports.TagResolver = TagResolver;
//# sourceMappingURL=tag.resolver.js.map