import React from 'react';
import { useSelector } from 'react-redux';
import { LineSpacer } from '../../components';
import { RootState } from '../../reducers';
import { AesPassphraseContainer } from './AesPassphraseContainer';
import { CreateNoteContainer } from './CreateNoteContainer';
import { NoteListContainer } from './NoteListContainer';

export const NotesPage = () => {
  const aesPassphrase = useSelector(
    (state: RootState) => state.currentUser.aesPassphrase,
  );
  const searchValue = useSelector(
    (state: RootState) => state.searchNotes.searchValue,
  );

  return (
    <div>
      <LineSpacer />
      {!searchValue &&
        (!aesPassphrase ? <AesPassphraseContainer /> : <CreateNoteContainer />)}
      <LineSpacer />
      <NoteListContainer />
    </div>
  );
};
