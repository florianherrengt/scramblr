import React, { useState } from 'react';

import { Button, Modal, Backdrop, Slide, TextField } from '@material-ui/core/';
import styled from 'styled-components';

interface EditTagModalProps {
  open: boolean;
  label: string;
  onClose(): void;
  onSubmit(label: string): void;
}

const Content = styled.div`
  display: 'flex';
  align-items: 'center';
  justify-content: 'center';
  background-color: white;
  border: 0;
  border-radius: 5px;
  padding: 20px;
`;

export const EditTagModal: React.SFC<EditTagModalProps> = props => {
  const [value, setValue] = useState('');
  return (
    <Modal
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
        <Content>
          <form
            onSubmit={event => {
              event.preventDefault();
              setValue('');
              props.onSubmit(value);
            }}
          >
            <TextField
              onChange={event => setValue(event.target.value)}
              defaultValue={props.label}
            />
            <Button type='submit'>Save</Button>
          </form>
        </Content>
      </Slide>
    </Modal>
  );
};
