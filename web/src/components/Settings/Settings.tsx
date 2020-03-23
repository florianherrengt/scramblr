import { Button, Card, CardContent } from '@material-ui/core';
import React from 'react';
import { LineSpacer } from '../LineSpacer';

interface SettingsProps {
    onLogout(): void;
}

export const Settings: React.SFC<SettingsProps> = props => {
    return (
        <div className='Settings'>
            <Card>
                <CardContent>
                    <LineSpacer />
                    <Button
                        className='Settings_Button_Logout'
                        onClick={props.onLogout}
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
