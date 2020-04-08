import React from 'react';
import { LineSpacer } from '..';
import '../../styles/index.scss';
import { MoodSelector } from './';

export default {
    component: MoodSelector,
    title: 'MoodSelector',
};

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <LineSpacer />
        <MoodSelector />
    </div>
);
