import {
    Button,
    CircularProgress,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineSpacer } from '..';
import { RootState } from '../../redux';
import { SettingsProps } from './Settings';

export const EmailSettings: React.SFC<SettingsProps> = props => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [isDirty, setIsDirty] = useState(false);
    const isSaving = useSelector(
        (state: RootState) => state.appState.updateEmail.loading,
    );
    const isSending = useSelector(
        (state: RootState) => state.appState.resendEmail.loading,
    );
    const [email, setEmail] = useState<string>('');
    if (props.currentUser.isFetching) {
        return <CircularProgress />;
    }
    if (!props.currentUser.user) {
        return <div>Error, no user found.</div>;
    }
    return (
        <Fragment>
            <form
                className={classNames({ flex: isDesktop })}
                onSubmit={event => {
                    event.preventDefault();
                    props.onUpdateEmail({ email });
                }}
            >
                <TextField
                    className={classNames({
                        grow: isDesktop,
                        'width-100': !isDesktop,
                    })}
                    type='email'
                    label='Email'
                    variant='outlined'
                    disabled={props.currentUser.isFetching || isSaving}
                    value={
                        isDirty
                            ? email
                            : email || props.currentUser.user.email || ''
                    }
                    onChange={event => {
                        !isDirty && setIsDirty(true);
                        setEmail(event.target.value);
                    }}
                />
                <Button
                    disabled={isSaving}
                    onClick={() => email && props.onUpdateEmail({ email })}
                    className={classNames({
                        'width-100': !isDesktop,
                    })}
                >
                    Save
                </Button>
            </form>
            {props.currentUser.user?.email &&
                !props.currentUser.user?.emailConfirmed && (
                    <Fragment>
                        <LineSpacer variant='small' />
                        {isSending ? (
                            <CircularProgress size={20} />
                        ) : (
                            <Typography color='secondary'>
                                You need to confirm your email address.
                                <Button onClick={props.onResendEmailClick}>
                                    Resend email
                                </Button>
                            </Typography>
                        )}
                    </Fragment>
                )}
        </Fragment>
    );
};
