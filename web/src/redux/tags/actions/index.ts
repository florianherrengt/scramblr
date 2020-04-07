import { CreateTagAction } from './createTag';
import { DeleteTagAction } from './deleteTag';
import { GetTagsAction } from './fetchTags';
import { UpdateTagAction } from './updateTag';

export * from './createTag';
export * from './deleteTag';
export * from './fetchTags';
export * from './updateTag';

export type TagsAction =
    | GetTagsAction
    | DeleteTagAction
    | CreateTagAction
    | UpdateTagAction;
