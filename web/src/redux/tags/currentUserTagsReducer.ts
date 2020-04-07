import { decrypt, Tag, TagEmotion } from '../../helpers';
import { CurrentUserActionSetAesPassphrase, TagsAction } from '../actions';

interface CurrentUserTagsState {
    tags: Array<
        Omit<Tag, 'emotion'> & {
            isLoading?: boolean;
            transactionId?: string;
            revert?: Tag;
            emotion: TagEmotion;
        }
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

export const getEmotion = (emotion?: string | null): TagEmotion => {
    switch (emotion) {
        case TagEmotion.positive:
            return TagEmotion.positive;
        case TagEmotion.negative:
            return TagEmotion.negative;
        default:
            return TagEmotion.neutral;
    }
};

export const currentUserTags = (
    state: CurrentUserTagsState = defaultState,
    action: TagsAction | CurrentUserActionSetAesPassphrase,
): CurrentUserTagsState => {
    switch (action.type) {
        case 'SIGN_OUT_SUCCESS':
            return defaultState;

        case 'SET_AES_PASSPHRASE':
            return {
                ...state,
                tags: state.tags.map(tag => ({
                    ...tag,
                    label: decrypt(tag.label, action.user.aesPassphrase),
                })),
            };
        /* 
      GET
    */
        case 'GET_CURRENT_USER_TAGS_REQUEST':
            return { ...state, ...action, isFetching: true };
        case 'GET_CURRENT_USER_TAGS_SUCCESS':
            return {
                ...state,
                tags: action.tags.map(tag => ({
                    ...tag,
                    emotion: getEmotion(tag.emotion),
                })),
                fetched: true,
                isFetching: false,
            };
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
                        createdAt: new Date(),
                        emotion: getEmotion(action.tag.emotion),
                    },
                    ...state.tags,
                ],
            };
        case 'CREATE_TAGS_SUCCESS':
            return {
                ...state,
                tags: state.tags.map(tag =>
                    tag.transactionId === action.transactionId
                        ? {
                              ...action.tag,
                              emotion: getEmotion(action.tag.emotion),
                          }
                        : tag,
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
                              emotion: getEmotion(tag.emotion),
                          }
                        : tag,
                ),
            };
        case 'UPDATE_TAGS_SUCCESS':
            return {
                ...state,
                tags: state.tags.map(tag =>
                    tag.transactionId === action.transactionId
                        ? {
                              ...action.tag,
                              emotion: getEmotion(action.tag.emotion),
                          }
                        : tag,
                ),
            };
        case 'UPDATE_TAGS_FAILURE':
            return {
                ...state,
                tags: state.tags.map(tag =>
                    tag.transactionId === action.transactionId
                        ? { ...tag.revert!, emotion: getEmotion(tag.emotion) }
                        : tag,
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
                        ? {
                              ...tag,
                              isLoading: true,
                              transactionId: action.transactionId,
                          }
                        : tag,
                ),
            };
        case 'DELETE_TAGS_SUCCESS':
            return {
                ...state,
                tags: state.tags.filter(tag => tag.id !== action.id),
            };
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
