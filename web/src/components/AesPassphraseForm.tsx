import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

interface AesPassphraseFormProps {
  testNote: string;
  defaultValue?: string;
  submitLabel?: string;
  onSubmit(input: {
    passphrase: string;
    shouldSaveToLocalstorage: boolean;
  }): any;
}

const Container = styled.div`
  width: 100%;
`;

const AesPassphraseForm = (props: AesPassphraseFormProps) => {
  const isMobile = useMediaQuery('(max-width:450px)');
  const [aesPassphrase, setAesPassphrase] = useState<string>(
    props.defaultValue || '',
  );
  const [error, setError] = useState<string>();
  const [shouldSaveToLocalstorage, setShouldSaveToLocalstorage] = useState<
    boolean
  >(true);

  const submit = () => {
    console.log(aesPassphrase);
    props.onSubmit({ passphrase: aesPassphrase, shouldSaveToLocalstorage });
  };

  return (
    <Container className='AesPassphraseForm'>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (!aesPassphrase) {
            return;
          }
          submit();
        }}
      >
        <Card variant='outlined'>
          <CardContent>
            <div
              style={{ display: isMobile ? 'block' : 'flex', marginTop: 20 }}
            >
              <TextField
                className='AesPassphraseForm_TextField_Passphrase'
                autoFocus
                onChange={({ target: { value } }) => setAesPassphrase(value)}
                value={aesPassphrase}
                style={{ width: '100%' }}
                variant='outlined'
                placeholder='Enter you AES secret passphrase'
                onKeyDown={event => {
                  setError('');
                  if (event.key === 'Enter') {
                    if (event.ctrlKey || event.altKey || event.metaKey) {
                      event.preventDefault();
                      submit();
                    }
                  }
                }}
              />
            </div>

            <div style={{ display: isMobile ? 'block' : 'flex' }}>
              <FormControlLabel
                style={{ flex: 1 }}
                control={
                  <Checkbox
                    className='AesPassphraseForm_Checkbox_Remember'
                    checked={shouldSaveToLocalstorage}
                    onChange={event => {
                      setShouldSaveToLocalstorage(event.target.checked);
                    }}
                    color='primary'
                  />
                }
                label='Remember on this device'
              />
              <Tooltip
                disableTouchListener
                enterDelay={0}
                title={`${
                  navigator.platform.toLocaleLowerCase().includes('mac')
                    ? 'Cmd'
                    : 'Ctrl'
                } + Enter`}
                aria-label='save with Ctrl + Enter'
              >
                <Button
                  className='AesPassphraseForm_Button_Submit'
                  id='submit-aes-passphrase-button'
                  variant={isMobile ? 'outlined' : 'text'}
                  style={isMobile ? { width: '100%', marginTop: 20 } : {}}
                  type='submit'
                >
                  {props.submitLabel || 'Decrypt'}
                </Button>
              </Tooltip>
            </div>
            {error && <Typography color='error'>{error}</Typography>}
          </CardContent>
        </Card>
      </form>
    </Container>
  );
};

export { AesPassphraseForm };
