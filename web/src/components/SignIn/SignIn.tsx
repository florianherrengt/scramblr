import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routerUri } from '../../config/routerUri';
import { LineSpacer } from '../LineSpacer';

interface SignInProps {
    error?: string;
    loading: boolean;
    onSubmit(input: { username: string; password: string }): void;
}

export const SignIn = (props: SignInProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
        <div className='SignIn'>
            <form
                onSubmit={event => {
                    event.preventDefault();
                    props.onSubmit({ username, password });
                }}
            >
                <div>
                    <TextField
                        className='SignIn_TextField_Username width-100'
                        autoFocus
                        disabled={props.loading}
                        onChange={({ target }) => setUsername(target.value)}
                        variant='outlined'
                        label='Username'
                    />
                </div>
                <LineSpacer />
                <div>
                    <TextField
                        className='SignIn_TextField_Password width-100'
                        disabled={props.loading}
                        onChange={({ target }) => setPassword(target.value)}
                        variant='outlined'
                        label='Password'
                        type='password'
                    />
                </div>
                <LineSpacer />
                <Button
                    className='SignIn_TextField_Button_Submit width-100'
                    disabled={props.loading}
                    type='submit'
                    variant='outlined'
                >
                    Sign In
                </Button>
                {props.error && (
                    <div>
                        <LineSpacer />
                        <Typography className='text-center text-error'>
                            {props.error}
                        </Typography>
                    </div>
                )}
                <LineSpacer />
                <div className='text-center'>
                    <Typography variant='body2'>
                        Don't have an account yet?
                    </Typography>
                    <Typography variant='body2'>
                        <Link to={routerUri.signUp}>Create account</Link>
                    </Typography>
                </div>
            </form>
        </div>
    );
};
