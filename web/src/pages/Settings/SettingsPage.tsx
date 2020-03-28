import React from 'react';
import { LineSpacer, Settings } from '../../components';
import { AesPassphraseContainer } from '../Notes/AesPassphraseContainer';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { signOut } from '../../actions';

interface SettingsPageProps {}

export const SettingsPage: React.SFC<SettingsPageProps> = props => {
    const dispatch = useDispatch();

    return (
        <div className='SettingsPage'>
            <LineSpacer />
            <AesPassphraseContainer submitLabel='Save' />
            <LineSpacer />
            <Settings
                onLogoutClick={() => dispatch(signOut())}
                onExportClick={entity =>
                    window.open(`/api/export/${entity}`, '_blank')
                }
            />
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
