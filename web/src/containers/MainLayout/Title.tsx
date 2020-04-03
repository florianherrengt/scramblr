import React from 'react';
import { useLocation } from 'react-router';
import { $Keys } from 'utility-types';
import { routerUri } from '../../config';
import { Typography } from '@material-ui/core';

export const titles: { [key in $Keys<typeof routerUri>]: string } = {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    privacy: 'Privacy',
    termAndConditions: 'Terms and conditions',
    notes: 'Notes',
    settings: 'Settings',
    tags: 'Tags',
    search: 'Search',
    insights: 'Insights',
    paymentFailed: 'Payment failed',
};

export const getTitleFromPath = (pathname: string): string => {
    const locationName: string[] | undefined = Object.entries(routerUri).find(
        ([_, value]) => pathname === value,
    );
    if (!locationName) {
        return '';
    }
    return titles[locationName[0] as $Keys<typeof routerUri>];
};

export const Title = () => {
    const { pathname } = useLocation();
    return <Typography variant='h6'>{getTitleFromPath(pathname)}</Typography>;
};
