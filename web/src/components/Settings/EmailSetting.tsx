import {
    Button,
    CircularProgress,
    TextField,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { SettingsProps } from './Settings';

export const EmailSettings: React.SFC<SettingsProps> = props => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [email, setEmail] = useState<string>('');
    if (props.currentUser.isFetching) {
        return <CircularProgress />;
    }
    if (!props.currentUser.user) {
        return <div>Error, no user found.</div>;
    }
    return (
        <div className={classNames({ flex: isDesktop })}>
            <TextField
                className={classNames({
                    grow: isDesktop,
                    'width-100': !isDesktop,
                })}
                label='Email'
                variant='outlined'
                disabled={props.currentUser.isFetching}
                value={email || props.currentUser.user.email}
                onChange={event => setEmail(event.target.value)}
            />
            <Button
                onClick={() => email && props.onUpdateEmail({ email })}
                className={classNames({
                    'width-100': !isDesktop,
                })}
            >
                Save
            </Button>
        </div>
    );
};
