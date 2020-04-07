import CryptoJS from 'crypto-js';
import * as faker from 'faker';
import { range } from 'lodash';
import { ValuesType } from 'utility-types';
import {
    currentUserNotes,
    CurrentUserNotesState,
    defaultState,
} from './currentUserNotesReducer';

const getFakeNote = (): ValuesType<CurrentUserNotesState['notes']> => ({
    id: CryptoJS.lib.WordArray.random(128 / 8).toString(),
    createdAt: new Date(),
    isLoading: false,
    tags: [],
    text: faker.random.words(),
});

describe('Reducer/currentUserNotesReducer', () => {
    it('SIGN_OUT_SUCCESS', () => {
        const notes: CurrentUserNotesState['notes'] = range(0, 10).map(() =>
            getFakeNote(),
        );
        const oldState: CurrentUserNotesState = { ...defaultState, notes };
        const newState = currentUserNotes(oldState, {
            type: 'SIGN_OUT_SUCCESS',
        });
        expect(newState).toMatchObject(defaultState);
    });
    it('GET_CURRENT_USER_NOTES_REQUEST', () => {
        const oldState: CurrentUserNotesState = { ...defaultState };
        const newState = currentUserNotes(oldState, {
            type: 'GET_CURRENT_USER_NOTES_REQUEST',
        });
        expect(newState.fetched).toBeFalsy();
        expect(newState.error).toBeFalsy();
        expect(newState.isFetching).toBeTruthy();
    });
    it('GET_CURRENT_USER_NOTES_SUCCESS', () => {
        const notes: CurrentUserNotesState['notes'] = range(0, 10).map(() =>
            getFakeNote(),
        );
        const oldState: CurrentUserNotesState = { ...defaultState };
        const newState = currentUserNotes(oldState, {
            type: 'GET_CURRENT_USER_NOTES_SUCCESS',
            notes: {
                hasMore: false,
                items: notes,
                total: 1,
            },
        });
        expect(newState.fetched).toBeTruthy();
        expect(newState.error).toBeFalsy();
        expect(newState.hasMore).toBeFalsy();
        expect(newState.isFetching).toBeFalsy();
        expect(newState.notes).toMatchObject(notes);
        expect(newState.total).toEqual(1);
    });
    it('GET_CURRENT_USER_NOTES_FAILURE', () => {
        const oldState: CurrentUserNotesState = { ...defaultState };
        const newState = currentUserNotes(oldState, {
            type: 'GET_CURRENT_USER_NOTES_FAILURE',
        });
        expect(newState.fetched).toBeTruthy();
        expect(newState.error).toBeTruthy();
        expect(newState.isFetching).toBeFalsy();
    });

    it('DELETE_NOTE_REQUEST', () => {
        const note = getFakeNote();
        const oldState: CurrentUserNotesState = {
            ...defaultState,
            notes: [note],
        };
        const newState = currentUserNotes(oldState, {
            type: 'DELETE_NOTE_REQUEST',
            id: note.id,
        });
        expect(newState.notes[0].isLoading).toBeTruthy();
    });
    it('DELETE_NOTE_SUCCESS', () => {
        const note = getFakeNote();
        const oldState: CurrentUserNotesState = {
            ...defaultState,
            notes: [note],
        };
        const newState = currentUserNotes(oldState, {
            type: 'DELETE_NOTE_SUCCESS',
            id: note.id,
        });
        expect(newState.notes.length).toEqual(0);
    });
    it('DELETE_NOTE_FAILURE', () => {
        const note = getFakeNote();
        const oldState: CurrentUserNotesState = {
            ...defaultState,
            notes: [note],
        };
        const newState = currentUserNotes(oldState, {
            type: 'DELETE_NOTE_FAILURE',
            id: note.id,
            error: 'error message',
        });
        expect(newState.notes[0].isLoading).toBeFalsy();
    });
    it('CREATE_NOTE_REQUEST', () => {
        const transactionId = faker.random.uuid();
        const oldState: CurrentUserNotesState = {
            ...defaultState,
        };
        const newState = currentUserNotes(oldState, {
            type: 'CREATE_NOTE_REQUEST',
            note: getFakeNote(),
            transactionId,
        });
        expect(newState.notes[0].isLoading).toBeTruthy();
        expect(newState.notes[0].transactionId).toEqual(transactionId);
    });
    it('CREATE_NOTE_SUCCESS', () => {
        const transactionId = faker.random.uuid();
        const note: ValuesType<CurrentUserNotesState['notes']> = {
            ...getFakeNote(),
            transactionId,
        };
        const oldState: CurrentUserNotesState = {
            ...defaultState,
            notes: [note],
        };
        const newState = currentUserNotes(oldState, {
            type: 'CREATE_NOTE_SUCCESS',
            note,
            transactionId,
        });
        expect(newState.notes[0].isLoading).toBeFalsy();
        expect(newState.notes[0]).toMatchObject(note);
        expect(newState.total).toEqual(1);
    });
    it('CREATE_NOTE_FAILURE', () => {
        const transactionId = faker.random.uuid();
        const note: ValuesType<CurrentUserNotesState['notes']> = {
            ...getFakeNote(),
            transactionId,
        };
        const note2 = getFakeNote();
        const oldState: CurrentUserNotesState = {
            ...defaultState,
            notes: [note, note2],
        };
        const newState = currentUserNotes(oldState, {
            type: 'CREATE_NOTE_FAILURE',
            transactionId,
            error: 'error message',
        });

        expect(newState.total).toEqual(0);
        expect(newState.notes.length).toEqual(1);
        expect(newState.notes[0]).toMatchObject(note2);
    });
});
