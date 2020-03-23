import { Button, Card, CardContent } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { LineSpacer } from './LineSpacer';

interface SettingsProps {
  onLogout(): void;
}

const DangerButton = styled(Button)`
  width: 100%;
`;

export const Settings: React.SFC<SettingsProps> = props => {
  return (
    <div className='Settings'>
      <Card>
        <CardContent>
          <LineSpacer />
          <DangerButton
            className='Settings_Button_Logout'
            onClick={props.onLogout}
            variant='outlined'
            color='secondary'
          >
            Logout
          </DangerButton>
        </CardContent>
      </Card>
    </div>
  );
};
