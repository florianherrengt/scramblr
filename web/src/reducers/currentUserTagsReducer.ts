import { TagsAction } from '../actions';
import { Tag } from '../helpers/';

interface CurrentUserTagsState {
  tags: Array<
    Tag & { isLoading?: boolean; transactionId?: string; revert?: Tag }
  >;
  isFetching: boolean;
  error?: string;
  fetched: boolean;
}

const defaultState: CurrentUserTagsState = {
  tags: [],
  isFetching: false,
  fetched: false,
};

export const currentUserTags = (
  state: CurrentUserTagsState = defaultState,
  action: TagsAction,
): CurrentUserTagsState => {
  switch (action.type) {
    /* 
      GET
    */
    case 'GET_CURRENT_USER_TAGS_REQUEST':
      return { ...state, ...action, isFetching: true };
    case 'GET_CURRENT_USER_TAGS_SUCCESS':
      return { ...state, tags: action.tags, fetched: true, isFetching: false };
    case 'GET_CURRENT_USER_TAGS_FAILURE':
      return { ...state, ...action, fetched: true, isFetching: false };

    /* 
      CREATE
    */
    case 'CREATE_TAGS_REQUEST':
      return {
        ...state,
        tags: [
          {
            ...action.tag,
            id: action.transactionId,
            transactionId: action.transactionId,
            isLoading: true,
          },
          ...state.tags,
        ],
      };
    case 'CREATE_TAGS_SUCCESS':
      return {
        ...state,
        tags: state.tags.map(tag =>
          tag.transactionId === action.transactionId ? action.tag : tag,
        ),
      };
    case 'CREATE_TAGS_FAILURE':
      return {
        ...state,
        tags: state.tags.filter(
          tag => tag.transactionId !== action.transactionId,
        ),
      };

    /* 
      UPDATE
    */
    case 'UPDATE_TAGS_REQUEST':
      return {
        ...state,
        tags: state.tags.map(tag =>
          tag.id === action.tag.id
            ? {
                ...tag,
                ...action.tag,
                transactionId: action.transactionId,
                isLoading: true,
                revert: tag,
              }
            : tag,
        ),
      };
    case 'UPDATE_TAGS_SUCCESS':
      return {
        ...state,
        tags: state.tags.map(tag =>
          tag.transactionId === action.transactionId ? action.tag : tag,
        ),
      };
    case 'UPDATE_TAGS_FAILURE':
      return {
        ...state,
        tags: state.tags.map(tag =>
          tag.transactionId === action.transactionId ? tag.revert! : tag,
        ),
      };

    /* 
      DELETE
    */
    case 'DELETE_TAGS_REQUEST':
      return {
        ...state,
        tags: state.tags.map(tag =>
          tag.id === action.id
            ? { ...tag, isLoading: true, transactionId: action.transactionId }
            : tag,
        ),
      };
    case 'DELETE_TAGS_SUCCESS':
      return { ...state, tags: state.tags.filter(tag => tag.id !== action.id) };
    case 'DELETE_TAGS_FAILURE':
      return {
        ...state,
        tags: state.tags.map(tag =>
          tag.transactionId === action.transactionId
            ? { ...tag, isLoading: false, transactionId: undefined }
            : tag,
        ),
      };
    default:
      return state;
  }
};
