import React, { useEffect } from 'react';
import { LineSpacer, Settings } from '../../components';
import { AesPassphraseContainer } from '../Notes/AesPassphraseContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
    signOut,
    updateEmail,
    resendConfirmEmail,
    fetchCurrentUser,
} from '../../actions';
import { RootState } from '../../reducers';

interface SettingsPageProps {}

export const SettingsPage: React.SFC<SettingsPageProps> = props => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.currentUser);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    return (
        <div className='SettingsPage'>
            <LineSpacer />
            <AesPassphraseContainer submitLabel='Save' />
            <LineSpacer />
            <Settings
                onResendEmailClick={() => dispatch(resendConfirmEmail({}))}
                onUpdateEmail={input => dispatch(updateEmail(input))}
                currentUser={currentUser}
                onLogoutClick={() => dispatch(signOut())}
                onExportClick={entity =>
                    window.open(`/api/export/${entity}`, '_blank')
                }
            />
        </div>
    );
};
