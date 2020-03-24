import React, { useState } from 'react';
import { signIn } from '../../actions';
import { LineSpacer } from '../../components/LineSpacer';
import { SignIn } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers';

export const SignInPage = () => {
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
