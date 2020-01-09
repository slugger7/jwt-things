import React from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
  const token = window.localStorage.getItem('token');

  const signOut = () => {
    window.localStorage.clear();
    history.push('/');
  }

  return token ? (
    <p>
      <span>Welcome {window.localStorage.getItem('username')} </span>
      <button onClick={signOut}>Sign out</button>
    </p>
  ) : (
    <p>You are not signed in</p>
  );
}
