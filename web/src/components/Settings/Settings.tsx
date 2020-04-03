import {
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
} from '@material-ui/core';
import React from 'react';
import { RootState } from '../../reducers';
import { LineSpacer } from '../LineSpacer';
import { EmailSettings } from './EmailSetting';
import { SubscriptionSettings } from './SubscriptionSettings';

export interface SettingsProps {
    currentUser: RootState['currentUser'];
    onUpdateEmail(input: { email: string }): void;
    onResendEmailClick(): void;
    onLogoutClick(): void;
    onExportClick(entity: 'notes' | 'tags'): void;
    onSubscribeClick(): void;
}

export const Settings: React.SFC<SettingsProps> = props => {
    return (
        <div className='Settings'>
            <Card variant='outlined'>
                <CardHeader title='Account' />
                <CardContent>
                    <TextField
                        className='width-100'
                        disabled
                        label='Username'
                        variant='outlined'
                        value={props.currentUser.user?.username || ''}
                    />
                    <LineSpacer />
                    <EmailSettings {...props} />

                    <LineSpacer />

                    <Button
                        className='Settings_Button_Logout'
                        onClick={props.onLogoutClick}
                        variant='outlined'
                        color='secondary'
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
            <LineSpacer />
            <SubscriptionSettings {...props} />
            <LineSpacer />
            <Card variant='outlined' className='Settings_Export'>
                <CardHeader title='Export' />
                <CardContent>
                    <Button
                        className='Settings_Button_Export_Notes'
                        onClick={() => props.onExportClick('notes')}
                        variant='outlined'
                    >
                        Export Notes
                    </Button>
                    <LineSpacer />
                    <Button
                        className='Settings_Button_Export_Tags'
                        onClick={() => props.onExportClick('tags')}
                        variant='outlined'
                    >
                        Export Tags
                    </Button>
                </CardContent>
            </Card>
            <LineSpacer />
            <Card variant='outlined' className='Settings_Import'>
                <CardHeader title='Import' />
                <CardContent>
                    <form
                        className='width-100'
                        action='/api/import/notes'
                        method='post'
                        encType='multipart/form-data'
                    >
                        <input type='file' name='data' required />
                        <div>
                            <LineSpacer />
                            <Button
                                type='submit'
                                className='Settings_Button_Import_Notes'
                                variant='outlined'
                            >
                                Import Notes
                            </Button>
                        </div>
                    </form>
                    <LineSpacer />
                    <form
                        className='width-100'
                        action='/api/import/tags'
                        method='post'
                        encType='multipart/form-data'
                    >
                        <input type='file' name='data' required />
                        <div>
                            <LineSpacer />
                            <Button
                                type='submit'
                                className='Settings_Button_Import_Tags'
                                variant='outlined'
                            >
                                Import Tags
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
