import React from 'react';
import classNames from 'classnames';

interface LineSpacerProps {
    variant?: 'regular' | 'small';
}

const LineSpacer: React.SFC<LineSpacerProps> = props => {
    return (
        <div
            className={classNames([
                'LineSpacer',
                { 'LineSpacer--small': props.variant === 'small' },
            ])}
        />
    );
};

export { LineSpacer };
