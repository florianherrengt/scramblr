import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../actions';
import { SignIn } from '../../components';
import { LineSpacer } from '../../components/LineSpacer';
import { RootState } from '../../reducers';

export const SignInPage = () => {
    console.debug('SignInPage');
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.currentUser);
    return (
        <div className='SignInPage'>
            <LineSpacer />
            <SignIn
                error={currentUser.error}
                loading={currentUser.isFetching}
                onSubmit={async input => dispatch(signIn(input))}
            />
        </div>
    );
};
