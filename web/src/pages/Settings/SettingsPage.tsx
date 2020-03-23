import React from 'react';
import { LineSpacer, Settings } from '../../components';
import { AesPassphraseContainer } from '../Notes/AesPassphraseContainer';

interface SettingsPageProps {}

export const SettingsPage: React.SFC<SettingsPageProps> = props => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('aesPassphrase');
    window.location.reload();
  };
  return (
    <div className='SettingsPage'>
      <LineSpacer />
      <AesPassphraseContainer submitLabel='Save' />
      <LineSpacer />
      <Settings onLogout={logout} />
    </div>
  );
};
