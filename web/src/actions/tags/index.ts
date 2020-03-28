import { GetTagsAction } from './fetchTags';
import { DeleteTagAction } from './deleteTag';
import { CreateTagAction } from './createTag';
import { UpdateTagAction } from './updateTag';

export * from './fetchTags';
export * from './createTag';
export * from './updateTag';
export * from './deleteTag';

export type TagsAction =
    | GetTagsAction
    | DeleteTagAction
    | CreateTagAction
    | UpdateTagAction;
