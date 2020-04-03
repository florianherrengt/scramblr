import React, { useEffect } from 'react';
import { LineSpacer, Settings } from '../../components';
import { AesPassphraseContainer } from '../Notes/AesPassphraseContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
    signOut,
    updateEmail,
    resendConfirmEmail,
    fetchCurrentUser,
} from '../../actions';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { loadStripe } from '@stripe/stripe-js';
import { getApi } from '../../helpers';

interface SettingsPageProps {}

export const SettingsPage: React.SFC<SettingsPageProps> = props => {
    type AppDispatch = ThunkDispatch<{}, any, any>;
    const dispatch: AppDispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.currentUser);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const onSubscribeClick = async () => {
        const api = getApi();
        const { stripeSessionId } = await api.getStripeSessionId({});
        const stripe = await loadStripe(
            'pk_test_nNJ1yhjyNrssOiEOf9NPxJ4w00mtI6Cxha',
        );
        await stripe?.redirectToCheckout({
            sessionId: stripeSessionId,
        });
    };

    return (
        <div className='SettingsPage'>
            <LineSpacer />
            <AesPassphraseContainer submitLabel='Save' />
            <LineSpacer />
            <Settings
                checkoutLoading={false}
                onSubscribeClick={() => onSubscribeClick()}
                onResendEmailClick={() => dispatch(resendConfirmEmail({}))}
                onUpdateEmail={input => dispatch(updateEmail(input))}
                currentUser={currentUser}
                onLogoutClick={() => dispatch(signOut())}
                onExportClick={entity =>
                    window.open(`/api/export/${entity}`, '_blank')
                }
            />
        </div>
    );
};
