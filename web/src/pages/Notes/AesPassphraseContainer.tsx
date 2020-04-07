import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AesPassphraseForm } from '../../components';
import { RootState } from '../../redux';
import { setAesPassphrase } from '../../redux/actions';

interface AesPassphraseContainerProps {
    submitLabel?: string;
}

export const AesPassphraseContainer: React.SFC<AesPassphraseContainerProps> = props => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state: RootState) => state.currentUser);
    const currentUserNotes = useSelector(
        (state: RootState) => state.currentUserNotes,
    );

    if (currentUserNotes.isFetching) {
        return <CircularProgress />;
    }

    const aesPassphrase = currentUser.demo ? 'demo' : currentUser.aesPassphrase;
    return (
        <AesPassphraseForm
            defaultValue={aesPassphrase}
            submitLabel={props.submitLabel}
            testNote={
                (currentUserNotes.notes.length &&
                    currentUserNotes.notes[0].text) ||
                ''
            }
            onSubmit={({ passphrase, shouldSaveToLocalstorage }) => {
                dispatch(
                    setAesPassphrase(passphrase, shouldSaveToLocalstorage),
                );
            }}
        />
    );
};
