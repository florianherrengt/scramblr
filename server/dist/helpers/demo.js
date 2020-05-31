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
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
const date_fns_1 = require("date-fns");
const faker = require("faker");
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const entities_1 = require("../entities");
const logger_1 = require("./logger");
const logger = logger_1.getLogger('stripePaymentSuccessHandler');
exports.encrypt = (str) => {
    if (!str) {
        return '';
    }
    return CryptoJS.AES.encrypt(str, 'demo').toString();
};
let PopulateDemo = class PopulateDemo {
    constructor(connection, noteRepository, userRepository, tagRepository) {
        this.connection = connection;
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }
    populate() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('populating...');
            const queryRunner = this.connection.createQueryRunner();
            yield queryRunner.startTransaction();
            yield queryRunner.connect();
            const manager = queryRunner.manager;
            try {
                yield manager.delete(entities_1.User, { username: 'demo' });
                const user = this.userRepository.create({
                    username: 'demo',
                    password: bcrypt.hashSync('demo'),
                });
                yield manager.save(entities_1.User, user);
                const tags = {
                    happy: yield manager.save(this.tagRepository.create({
                        label: exports.encrypt('happy'),
                        emotion: entities_1.TagEmotion.positive,
                        user,
                    })),
                    achievement: yield manager.save(this.tagRepository.create({
                        label: exports.encrypt('achievement'),
                        emotion: entities_1.TagEmotion.positive,
                        user,
                    })),
                    mom: yield manager.save(this.tagRepository.create({
                        label: exports.encrypt('mom'),
                        user,
                    })),
                    family: yield manager.save(this.tagRepository.create({
                        label: exports.encrypt('family'),
                        user,
                    })),
                    frustrated: yield manager.save(this.tagRepository.create({
                        label: exports.encrypt('frustrated'),
                        emotion: entities_1.TagEmotion.negative,
                        user,
                    })),
                    startupIdea: yield manager.save(this.tagRepository.create({
                        label: exports.encrypt('startup-idea'),
                        user,
                    })),
                };
                const randomTags = lodash_1.range(1, 10).map(() => this.tagRepository.create({
                    emotion: faker.random.arrayElement([
                        entities_1.TagEmotion.positive,
                        entities_1.TagEmotion.neutral,
                        entities_1.TagEmotion.negative,
                    ]),
                    label: exports.encrypt(faker.random.word().toLowerCase()),
                    user,
                }));
                yield manager.insert(entities_1.Tag, randomTags);
                yield manager.save(entities_1.Note, [
                    ...lodash_1.range(1, 10).map(() => ({
                        text: exports.encrypt(faker.hacker.adjective() +
                            ' ' +
                            faker.hacker.noun()),
                        tags: [tags.startupIdea],
                        createdAt: new Date(),
                    })),
                ].map((note) => this.noteRepository.create(Object.assign(Object.assign({}, note), { user }))));
                const randomNotes = lodash_1.range(1, 100)
                    .map(() => ({
                    text: exports.encrypt(faker.hacker.phrase()),
                    tags: lodash_1.range(0, 2).map(() => faker.random.arrayElement(randomTags)),
                    createdAt: faker.date.between(date_fns_1.startOfYear(new Date()), new Date()),
                }))
                    .map((note) => this.noteRepository.create(Object.assign(Object.assign({}, note), { user })));
                yield manager.insert(entities_1.Note, randomNotes);
                yield Promise.all(randomNotes.map((note) => manager.save(entities_1.Note, Object.assign(Object.assign({}, note), { tags: [faker.random.arrayElement(randomTags)] }))));
                const notes = [
                    {
                        text: 'I finally mangaged to fix this bug! I have deployed the app and it works!',
                        tags: [tags.achievement],
                    },
                    {
                        text: 'Walked the dog for a bit. Weather was sunny but chilly, helped me clear my mind.',
                        tags: [tags.happy],
                    },
                    {
                        text: "Can't figure out this bug in my application, it has been driving me crazy for the last two days!",
                        tags: [tags.frustrated],
                    },
                    {
                        text: "It's like Uber but with horses",
                        tags: [tags.startupIdea],
                    },
                    {
                        text: 'Family dinner. Mom cooked something really good.',
                        tags: [tags.happy, tags.family, tags.mom],
                    },
                ];
                yield manager.save(entities_1.Note, notes.map((note) => this.noteRepository.create(Object.assign(Object.assign({}, note), { text: exports.encrypt(note.text), user }))));
                yield queryRunner.commitTransaction();
            }
            catch (error) {
                logger.log(error);
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
};
PopulateDemo = __decorate([
    __param(1, typeorm_typedi_extensions_1.InjectRepository(entities_1.Note)),
    __param(2, typeorm_typedi_extensions_1.InjectRepository(entities_1.User)),
    __param(3, typeorm_typedi_extensions_1.InjectRepository(entities_1.Tag)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PopulateDemo);
exports.PopulateDemo = PopulateDemo;
//# sourceMappingURL=demo.js.map