import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { LineSpacer } from '../LineSpacer';

interface SettingsProps {
    onLogoutClick(): void;
    onExportClick(entity: 'notes' | 'tags'): void;
}

export const Settings: React.SFC<SettingsProps> = props => {
    return (
        <div className='Settings'>
            <Card>
                <CardHeader title='Data' />
                <CardContent>
                    <LineSpacer />
                    <Button
                        className='Settings_Button_Export_Notes'
                        onClick={() => props.onExportClick('notes')}
                        variant='outlined'
                    >
                        Export Notes
                    </Button>
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
            <Card>
                <CardHeader title='Account' />
                <CardContent>
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
        </div>
    );
};
