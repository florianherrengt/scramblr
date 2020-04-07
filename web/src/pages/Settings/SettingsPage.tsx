import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { LineSpacer, Settings } from '../../components';
import { getApi } from '../../helpers';
import { RootState } from '../../redux';
import {
    cancelSubscription,
    deletePaymentMethod,
    fetchCurrentUser,
    fetchPaymentMethods,
    resendConfirmEmail,
    signOut,
    updateDefaultPaymentMethod,
    updateEmail,
} from '../../redux/actions';
import { AesPassphraseContainer } from '../Notes/AesPassphraseContainer';

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
