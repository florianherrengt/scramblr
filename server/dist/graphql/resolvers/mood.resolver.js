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
const mood_input_1 = require("../inputs/mood.input");
let MoodResolver = class MoodResolver {
    constructor(moodRepository) {
        this.moodRepository = moodRepository;
    }
    moods(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = context.user || {};
            if (!username) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const moods = yield this.moodRepository.find({
                user: { username },
            });
            return moods;
        });
    }
    recordMood(input, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = context.user || {};
            if (!username) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            if (![0, 1, 2, 3].includes(input.rating)) {
                throw new Error('Invalid mood rating');
            }
            const mood = this.moodRepository.create(input);
            yield this.moodRepository.save(mood);
            return mood;
        });
    }
};
__decorate([
    type_graphql_1.Query((returns) => [entities_1.Mood]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MoodResolver.prototype, "moods", null);
__decorate([
    type_graphql_1.Mutation((returns) => entities_1.Mood),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mood_input_1.RecordMoodInput, Object]),
    __metadata("design:returntype", Promise)
], MoodResolver.prototype, "recordMood", null);
MoodResolver = __decorate([
    type_graphql_1.Resolver(entities_1.Mood),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(entities_1.Mood)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MoodResolver);
exports.MoodResolver = MoodResolver;
//# sourceMappingURL=mood.resolver.js.map