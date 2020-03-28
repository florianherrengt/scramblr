import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../actions';
import { SignIn } from '../../components';
import { LineSpacer } from '../../components/LineSpacer';
import { RootState } from '../../reducers';
import { useHistory } from 'react-router';

export const SignInPage = () => {
    console.debug('SignInPage');
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state: RootState) => state.currentUser);
    useEffect(() => {
        const isDemo =
            new URLSearchParams(history.location.search).get('demo') === 'true';
        if (isDemo) {
            dispatch(signIn({ username: 'demo', password: 'demo' }, true));
        }
    }, [dispatch, history.location.search]);
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
