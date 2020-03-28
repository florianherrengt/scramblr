import React, { useState } from 'react';

import { Button, Modal, Backdrop, Slide, TextField } from '@material-ui/core/';
import { CreateTagForm, CreateTagFormProps } from '../CreateTagForm';
import { RootState } from '../../reducers';
import { ValuesType } from 'utility-types';

interface EditTagModalProps {
    open: boolean;
    tag?: ValuesType<RootState['currentUserTags']['tags']>;
    onClose(): void;
    onSubmit: CreateTagFormProps['onSubmit'];
}

export const EditTagModal: React.SFC<EditTagModalProps> = props => {
    return (
        <Modal
            className='EditTagModal'
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Slide direction='up' in={props.open}>
                <div className='EditTagModal_Content'>
                    <CreateTagForm
                        tag={props.tag}
                        submitLabel='Save'
                        onSubmit={props.onSubmit}
                    />
                </div>
            </Slide>
        </Modal>
    );
};
