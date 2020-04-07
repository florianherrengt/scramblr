import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

interface ConfirmModalProps {
    onCancel(): void;
    onConfirm(): void;
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
}

export interface ConfirmModalData {
    action: 'delete' | null;
    id: string | null;
}

export const ConfirmModal: React.SFC<ConfirmModalProps> = props => {
    return (
        <Dialog open={props.open} onClose={props.onCancel}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel} color='primary'>
                    Cancel
                </Button>
                <Button onClick={props.onConfirm} color='secondary' autoFocus>
                    {props.confirmText || 'Ok'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
