import throttle from 'lodash.throttle';
import React, { useState } from 'react';
import { signUp } from '../../actions';
import { LineSpacer } from '../../components/LineSpacer';
import { SignUp } from '../../components';
import { useDispatch } from 'react-redux';

export const SignUpPage = () => {
    const [usernameExists, setUsernameExists] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className='SignUpPage'>
            <LineSpacer />
            <SignUp
                loading={false}
                usernameExists={usernameExists}
                onUsernameChange={throttle(async username => {
                    setUsernameExists(false);
                }, 100)}
                onSubmit={async input => {
                    dispatch(signUp(input));
                }}
            />
        </div>
    );
};
