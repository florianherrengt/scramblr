import React, { useState } from 'react';
import { signIn } from '../actions';
import { LineSpacer } from '../components/LineSpacer';
import { SignIn } from '../components/SignIn';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
`;

export const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  return (
    <Container>
      <LineSpacer />
      <SignIn
        errors={[error]}
        loading={loading}
        onSubmit={async input => {
          try {
            await signIn(input);
            setLoading(true);
          } catch (error) {
            setError('Incorrect username or password');
          }
        }}
      />
    </Container>
  );
};
