import throttle from 'lodash.throttle';
import React, { useState } from 'react';
import { signUp } from '../actions';
import { LineSpacer } from '../components/LineSpacer';
import { SignUp } from '../components/SignUp';
import { api } from '../helpers';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
`;

export const SignUpPage = () => {
  const [usernameExists, setUsernameExists] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <LineSpacer />
      <SignUp
        loading={loading}
        usernameExists={usernameExists}
        onUsernameChange={throttle(async username => {
          setUsernameExists(false);
          setLoading(true);
          const { userExists } = await api.userExists({ username });
          setLoading(false);
          setUsernameExists(!!userExists);
        }, 100)}
        onSubmit={async input => {
          signUp(input);
        }}
      />
    </Container>
  );
};
