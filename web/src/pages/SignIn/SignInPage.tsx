import React, { useState } from 'react';
import { signIn } from '../../actions';
import { LineSpacer } from '../../components/LineSpacer';
import { SignIn } from '../../components';

export const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    return (
        <div className='SignInPage'>
            <LineSpacer />
            <SignIn
                errors={[error]}
                loading={loading}
                onSubmit={async input => {
                    try {
                        await signIn(input);
                        setLoading(true);
                    } catch (error) {
                        setError('Incorrect username or password');
                    }
                }}
            />
        </div>
    );
};
