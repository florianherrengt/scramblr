import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
import { startOfYear } from 'date-fns';
import * as faker from 'faker';
import { range } from 'lodash';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Note, Tag, TagEmotion, User } from '../entities';
import { getLogger } from './logger';

const logger = getLogger('stripePaymentSuccessHandler');

export const encrypt = (str?: string): string => {
    if (!str) {
        return '';
    }
    return CryptoJS.AES.encrypt(str, 'demo').toString();
};

export class PopulateDemo {
    constructor(
        private readonly connection: Connection,
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}
    async populate(): Promise<void> {
        console.info('populating...');

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        await queryRunner.connect();
        const manager = queryRunner.manager;
        try {
            await manager.delete(User, { username: 'demo' });
            const user = this.userRepository.create({
                username: 'demo',
                password: bcrypt.hashSync('demo'),
            });
            await manager.save(User, user);

            const tags = {
                happy: await manager.save(
                    this.tagRepository.create({
                        label: encrypt('happy'),
                        emotion: TagEmotion.positive,
                        user,
                    }),
                ),
                achievement: await manager.save(
                    this.tagRepository.create({
                        label: encrypt('achievement'),
                        emotion: TagEmotion.positive,
                        user,
                    }),
                ),
                mom: await manager.save(
                    this.tagRepository.create({
                        label: encrypt('mom'),
                        user,
                    }),
                ),
                family: await manager.save(
                    this.tagRepository.create({
                        label: encrypt('family'),
                        user,
                    }),
                ),
                frustrated: await manager.save(
                    this.tagRepository.create({
                        label: encrypt('frustrated'),
                        emotion: TagEmotion.negative,
                        user,
                    }),
                ),
                startupIdea: await manager.save(
                    this.tagRepository.create({
                        label: encrypt('startup-idea'),
                        user,
                    }),
                ),
            };

            const randomTags: Partial<Tag>[] = range(1, 10).map(() =>
                this.tagRepository.create({
                    emotion: faker.random.arrayElement<TagEmotion>([
                        TagEmotion.positive,
                        TagEmotion.neutral,
                        TagEmotion.negative,
                    ]),
                    label: encrypt(faker.random.word().toLowerCase()),
                    user,
                }),
            );

            await manager.insert(Tag, randomTags);

            await manager.save(
                Note,
                [
                    ...range(1, 10).map(() => ({
                        text: encrypt(
                            faker.hacker.adjective() +
                                ' ' +
                                faker.hacker.noun(),
                        ),
                        tags: [tags.startupIdea],
                        createdAt: new Date(),
                    })),
                ].map((note) => this.noteRepository.create({ ...note, user })),
            );

            const randomNotes = range(1, 100)
                .map(() => ({
                    text: encrypt(faker.hacker.phrase()),
                    tags: range(0, 2).map(() =>
                        faker.random.arrayElement(randomTags),
                    ),
                    createdAt: faker.date.between(
                        startOfYear(new Date()),
                        new Date(),
                    ),
                }))
                .map((note) => this.noteRepository.create({ ...note, user }));

            await manager.insert(Note, randomNotes);
            await Promise.all(
                randomNotes.map((note) =>
                    manager.save(Note, {
                        ...note,
                        tags: [faker.random.arrayElement(randomTags)],
                    }),
                ),
            );

            const notes: Partial<Note>[] = [
                {
                    text:
                        'I finally mangaged to fix this bug! I have deployed the app and it works!',
                    tags: [tags.achievement],
                },
                {
                    text:
                        'Walked the dog for a bit. Weather was sunny but chilly, helped me clear my mind.',
                    tags: [tags.happy],
                },
                {
                    text:
                        "Can't figure out this bug in my application, it has been driving me crazy for the last two days!",
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
            await manager.save(
                Note,
                notes.map((note) =>
                    this.noteRepository.create({
                        ...note,
                        text: encrypt(note.text),
                        user,
                    }),
                ),
            );

            await queryRunner.commitTransaction();
        } catch (error) {
            logger.log(error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
