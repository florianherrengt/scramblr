import React, { useEffect, useState } from 'react';
import { LineSpacer, Settings } from '../../components';
import { AesPassphraseContainer } from '../Notes/AesPassphraseContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
    signOut,
    updateEmail,
    resendConfirmEmail,
    fetchCurrentUser,
    updateDefaultPaymentMethod,
    deletePaymentMethod,
    cancelSubscription,
} from '../../actions';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { loadStripe } from '@stripe/stripe-js';
import { getApi } from '../../helpers';
import { fetchPaymentMethods } from '../../actions';

interface SettingsPageProps {}

export const SettingsPage: React.SFC<SettingsPageProps> = props => {
    type AppDispatch = ThunkDispatch<{}, any, any>;
    const dispatch: AppDispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.currentUser);
    const subscription = useSelector((state: RootState) => state.subscription);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchCurrentUser());
        dispatch(fetchPaymentMethods());
    }, [dispatch]);

    const onSubscribeClick = async () => {
        setCheckoutLoading(true);
        const api = getApi();
        const { stripeSessionId } = await api.getStripeSessionId({});
        const stripe = await loadStripe(
            'pk_test_nNJ1yhjyNrssOiEOf9NPxJ4w00mtI6Cxha',
        );
        await stripe?.redirectToCheckout({
            sessionId: stripeSessionId,
        });
        setCheckoutLoading(false);
    };

    const onUpdateDefaultPaymentMethod = (paymentMethodId: string) => {
        dispatch(updateDefaultPaymentMethod(paymentMethodId));
    };

    const onDeletePaymentMethod = (paymentMethodId: string) => {
        dispatch(deletePaymentMethod(paymentMethodId));
    };

    const onCancelSubscription = () => {
        dispatch(cancelSubscription());
    };

    return (
        <div className='SettingsPage'>
            <LineSpacer />
            <AesPassphraseContainer submitLabel='Save' />
            <LineSpacer />
            <Settings
                subscription={subscription}
                checkoutLoading={checkoutLoading}
                onCancelSubscription={onCancelSubscription}
                onDeletePaymentMethod={onDeletePaymentMethod}
                onUpdateDefaultPaymentMethod={onUpdateDefaultPaymentMethod}
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
