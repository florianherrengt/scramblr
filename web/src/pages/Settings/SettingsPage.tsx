import React from 'react';
import { LineSpacer, Settings } from '../../components';
import { AesPassphraseContainer } from '../Notes/AesPassphraseContainer';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { signOut } from '../../actions';

interface SettingsPageProps {}

export const SettingsPage: React.SFC<SettingsPageProps> = props => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(signOut());
    };
    return (
        <div className='SettingsPage'>
            <LineSpacer />
            <AesPassphraseContainer submitLabel='Save' />
            <LineSpacer />
            <Settings onLogout={logout} />
            <Button
                onClick={async () => {
                    window.open('/api/export/notes', '_blank');
                }}
            >
                Export Notes
            </Button>
        </div>
    );
};
