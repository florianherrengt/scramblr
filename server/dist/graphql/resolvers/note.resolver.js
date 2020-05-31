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
const lodash_1 = require("lodash");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const entities_1 = require("../../entities");
const note_entity_1 = require("../../entities/note.entity");
const note_input_1 = require("../inputs/note.input");
let PaginatedNoteResponse = class PaginatedNoteResponse {
};
__decorate([
    type_graphql_1.Field(type => [note_entity_1.Note]),
    __metadata("design:type", Array)
], PaginatedNoteResponse.prototype, "items", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], PaginatedNoteResponse.prototype, "total", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedNoteResponse.prototype, "hasMore", void 0);
PaginatedNoteResponse = __decorate([
    type_graphql_1.ObjectType(`PaginatedNoteResponse`, { isAbstract: true })
], PaginatedNoteResponse);
let NoteResolver = class NoteResolver {
    constructor(noteRepository, tagRepository) {
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
    }
    currentUserNotes(tagsId, limit, skip, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = context;
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            let query = this.noteRepository
                .createQueryBuilder('Note')
                .leftJoinAndSelect('Note.tags', 'tag')
                .where('Note.user = :username', {
                username: user.username,
                tagsId,
            });
            if (!lodash_1.isEmpty(tagsId)) {
                query = query.andWhere('tag.id IN (:...tagsId)', { tagsId });
            }
            const [items, total] = yield query
                .orderBy('Note.createdAt', 'DESC')
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            return {
                items,
                hasMore: total !== items.length + skip,
                total,
            };
        });
    }
    deleteNote(noteId, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.username)) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const { user } = context;
            const note = yield this.noteRepository.findOne({
                where: { id: noteId, user },
            });
            if (!note) {
                throw new Error('Cannot find note with ID: ' + noteId);
            }
            yield this.noteRepository.delete(note.id);
            return note;
        });
    }
    updateNote(input, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.username)) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const { user } = context;
            const { id, text, tags } = input;
            const note = yield this.noteRepository.findOne({
                where: { id: input.id, user },
                relations: ['tags'],
            });
            if (!note) {
                throw new Error('Cannot find note with ID: ' + id);
            }
            if (tags) {
                // @ts-ignore
                note.tags = tags.map(tag => ({ id: tag.id }));
            }
            if (text) {
                note.text = encodeURIComponent(text);
            }
            yield this.noteRepository.save(note);
            return (yield this.noteRepository.findOne(note.id, {
                relations: ['tags'],
            }));
        });
    }
    createNote(manager, input, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.username)) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const { username } = context.user;
            const { text, tags } = input;
            const noteTagsId = tags && tags.length ? tags.map(t => t.id) : [];
            const newNote = this.noteRepository.create({
                text: encodeURIComponent(text),
                user: { username },
                tags: noteTagsId.map(id => ({ id })),
            });
            yield manager.save(newNote);
            return newNote;
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => PaginatedNoteResponse),
    __param(0, type_graphql_1.Arg('tagsId', () => [String], { defaultValue: [] })),
    __param(1, type_graphql_1.Arg('limit', () => type_graphql_1.Int, { defaultValue: 10 })),
    __param(2, type_graphql_1.Arg('skip', () => type_graphql_1.Int, { defaultValue: 0 })),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "currentUserNotes", null);
__decorate([
    type_graphql_1.Mutation(returns => note_entity_1.Note),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "deleteNote", null);
__decorate([
    type_graphql_1.Mutation(returns => note_entity_1.Note),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_input_1.UpdateNoteInput, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "updateNote", null);
__decorate([
    typeorm_1.Transaction(),
    type_graphql_1.Mutation(returns => note_entity_1.Note),
    __param(0, typeorm_1.TransactionManager()),
    __param(1, type_graphql_1.Arg('input')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.EntityManager,
        note_input_1.CreateNoteInput, Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "createNote", null);
NoteResolver = __decorate([
    type_graphql_1.Resolver(note_entity_1.Note),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(note_entity_1.Note)),
    __param(1, typeorm_typedi_extensions_1.InjectRepository(entities_1.Tag)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], NoteResolver);
exports.NoteResolver = NoteResolver;
//# sourceMappingURL=note.resolver.js.map