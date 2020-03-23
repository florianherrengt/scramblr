import throttle from 'lodash.throttle';
import React, { useState } from 'react';
import { signUp } from '../../actions';
import { LineSpacer } from '../../components/LineSpacer';
import { SignUp } from '../../components';
import { api } from '../../helpers';

export const SignUpPage = () => {
    const [usernameExists, setUsernameExists] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className='SignUpPage'>
            <LineSpacer />
            <SignUp
                loading={loading}
                usernameExists={usernameExists}
                onUsernameChange={throttle(async username => {
                    setUsernameExists(false);
                    setLoading(true);
                    const { userExists } = await api.userExists({ username });
                    setLoading(false);
                    setUsernameExists(!!userExists);
                }, 100)}
                onSubmit={async input => {
                    signUp(input);
                }}
            />
        </div>
    );
};
