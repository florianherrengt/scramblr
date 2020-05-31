import { AppContext } from 'src/helpers';
import { Repository } from 'typeorm';
import { Tag } from '../../entities';
import { CreateTagInput, UpdateTagInput } from '../inputs/tag.input';
export declare class TagResolver {
    private readonly tagRepository;
    constructor(tagRepository: Repository<Tag>);
    currentUserTags(context: AppContext): Promise<Tag[]>;
    createTag(input: CreateTagInput, context: AppContext): Promise<Tag>;
    updateTag(tag: UpdateTagInput, context: AppContext): Promise<Tag | undefined>;
    deleteTag(id: string, context: AppContext): Promise<Tag | undefined>;
}
