import { AuthenticationError } from 'apollo-server-express';
import { isEmpty } from 'lodash';
import { AppContext } from 'src/helpers';
import {
    Arg,
    Ctx,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import {
    EntityManager,
    Repository,
    Transaction,
    TransactionManager,
} from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Tag } from '../../entities';
import { Note } from '../../entities/note.entity';
import { CreateNoteInput, UpdateNoteInput } from '../inputs/note.input';

@ObjectType(`PaginatedNoteResponse`, { isAbstract: true })
class PaginatedNoteResponse {
    @Field(type => [Note])
    items: Note[];

    @Field(type => Int)
    total: number;

    @Field()
    hasMore: boolean;
}

@Resolver(Note)
export class NoteResolver {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    ) { }

    @Query(returns => PaginatedNoteResponse)
    async currentUserNotes(
        @Arg('tagsId', () => [String], { defaultValue: [] }) tagsId: string[],
        @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
        @Arg('skip', () => Int, { defaultValue: 0 }) skip: number,
        @Ctx() context: AppContext,
    ): Promise<PaginatedNoteResponse> {
        const { user } = context;
        if (!user) {
            throw new AuthenticationError('User not logged in');
        }

        let query = this.noteRepository
            .createQueryBuilder('Note')
            .leftJoinAndSelect('Note.tags', 'tag')
            .where('Note.user = :username', {
                username: user.username,
                tagsId,
            });

        if (!isEmpty(tagsId)) {
            query = query.andWhere('tag.id IN (:...tagsId)', { tagsId });
        }

        const [items, total] = await query
            .orderBy('Note.createdAt', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return {
            items,
            hasMore: total !== items.length + skip,
            total,
        };
    }

    @Mutation(returns => Note)
    async deleteNote(
        @Arg('id') noteId: string,
        @Ctx() context: AppContext,
    ): Promise<Note> {
        if (!context.user?.username) {
            throw new AuthenticationError('User not logged in');
        }
        const { user } = context;
        const note = await this.noteRepository.findOne({
            where: { id: noteId, user },
        });
        if (!note) {
            throw new Error('Cannot find note with ID: ' + noteId);
        }
        await this.noteRepository.delete(note.id);
        return note;
    }

    @Mutation(returns => Note)
    async updateNote(
        @Arg('input') input: UpdateNoteInput,
        @Ctx() context: AppContext,
    ): Promise<Note> {
        if (!context.user?.username) {
            throw new AuthenticationError('User not logged in');
        }
        const { user } = context;
        const { id, text, tags } = input;
        const note = await this.noteRepository.findOne({
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
        await this.noteRepository.save(note);

        return (await this.noteRepository.findOne(note.id, {
            relations: ['tags'],
        }))!;
    }

    @Transaction()
    @Mutation(returns => Note)
    async createNote(
        @TransactionManager() manager: EntityManager,
        @Arg('input') input: CreateNoteInput,
        @Ctx() context: AppContext,
    ): Promise<any> {
        if (!context.user?.username) {
            throw new AuthenticationError('User not logged in');
        }
        const { username } = context.user;
        const { text, tags } = input;

        const noteTagsId: string[] =
            tags && tags.length ? tags.map(t => t.id) : [];

        const newNote = this.noteRepository.create({
            text: encodeURIComponent(text),
            user: { username },
            tags: noteTagsId.map(id => ({ id })),
        });
        await manager.save(newNote);
        return newNote;
    }
}
