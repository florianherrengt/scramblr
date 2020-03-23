import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 20px;
`;

const LineSpacer: React.SFC<{}> = () => {
  return <Container />;
};

export { LineSpacer };
