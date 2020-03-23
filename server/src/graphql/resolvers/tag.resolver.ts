import { ForbiddenError, AuthenticationError } from 'apollo-server-express';
import { AppContext } from 'src/helpers';
import { Arg, Ctx, Mutation, Query, Resolver, Int } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Tag } from '../../entities';
import { CreateTagInput, UpdateTagInput } from '../inputs/tag.input';

@Resolver(Tag)
export class TagResolver {
    constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {}

    @Query(returns => [Tag])
    async currentUserTags(@Ctx() context: AppContext): Promise<Tag[]> {
        if (!context.user) {
            throw new ForbiddenError('User not logged in');
        }
        const { username } = context.user;
        return this.tagRepository.find({
            where: { user: { username } },
        });
    }
    @Mutation(returns => Tag)
    async createTag(@Arg('input') input: CreateTagInput, @Ctx() context: AppContext): Promise<Tag> {
        if (!context.user) {
            throw new AuthenticationError('User not logged in');
        }
        const newTag = this.tagRepository.create({ ...input, user: context.user });
        await this.tagRepository.save(newTag);
        return newTag;
    }
    @Mutation(returns => Tag)
    async updateTag(@Arg('input') tag: UpdateTagInput, @Ctx() context: AppContext): Promise<Tag | undefined> {
        if (!context.user) {
            throw new AuthenticationError('User not logged in');
        }
        const { user } = context;
        await this.tagRepository.update({ id: tag.id }, { ...tag, user });
        return this.tagRepository.findOne(tag.id);
    }
    @Mutation(returns => Tag)
    async deleteTag(@Arg('id') id: string, @Ctx() context: AppContext): Promise<Tag | undefined> {
        if (!context.user) {
            throw new AuthenticationError('User not logged in');
        }
        const { user } = context;
        const tag = await this.tagRepository.findOne(id);
        if (!tag) {
            throw new Error(`Tag with id ${id} does not exist`);
        }
        await this.tagRepository.delete({ id, user });
        return tag;
    }
}
