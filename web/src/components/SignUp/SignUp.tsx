import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import throttle from 'lodash.throttle';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routerUri } from '../../config/routerUri';
import { LineSpacer } from '../LineSpacer';

interface SignUpProps {
    usernameExists: boolean;
    loading: boolean;
    onUsernameChange(username: string): void;
    onSubmit(input: { username: string; password: string }): void;
}

export const SignUp = (props: SignUpProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const onUsernameChange = useRef(
        throttle((newUsername: string) => {
            props.onUsernameChange(newUsername);
        }, 200),
    );

    const onSubmit = () => props.onSubmit({ username, password });

    useEffect(() => onUsernameChange.current(username), [username]);
    return (
        <div className='SignUp'>
            <form
                onSubmit={event => {
                    event.preventDefault();
                    onSubmit();
                }}
            >
                <div>
                    <TextField
                        autoComplete='off'
                        autoCapitalize='none'
                        className='SignUp_TextField_Username width-100'
                        autoFocus
                        onChange={({ target }) => {
                            setUsername(target.value);
                        }}
                        InputProps={{
                            endAdornment: props.loading && (
                                <CircularProgress size={20} />
                            ),
                        }}
                        error={props.usernameExists}
                        helperText={
                            props.usernameExists && 'Username already exists'
                        }
                        variant='outlined'
                        label='Username'
                    />
                </div>
                <LineSpacer />
                <div>
                    <TextField
                        autoComplete='password'
                        className='SignUp_TextField_Password width-100'
                        onChange={({ target }) => setPassword(target.value)}
                        variant='outlined'
                        label='Password'
                        type='password'
                    />
                </div>
                <LineSpacer />
                <Button
                    className='SignUp_Button_Submit width-100'
                    type='submit'
                    variant='outlined'
                >
                    Sign Up
                </Button>
                <LineSpacer />
                <div className='text-center'>
                    <Typography variant='body2'>
                        By creating an account, you are agreeing to our{' '}
                        <Link to={routerUri.termAndConditions}>
                            Terms of Service
                        </Link>{' '}
                        and <Link to={routerUri.privacy}>Privacy Policy</Link>.
                    </Typography>
                    <LineSpacer />
                    <Typography variant='body2'>
                        Already have an account?
                    </Typography>
                    <Typography variant='body2'>
                        <Link to={routerUri.signIn}>Sign in</Link>
                    </Typography>
                </div>
            </form>
        </div>
    );
};
