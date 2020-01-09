import jwt from 'jsonwebtoken';
import { api } from './api';
const { localStorage } = window;

export const authenticateUser = (username, password) => api(
  req => {
    console.log('Constructing the post request');
    return req
      .post('authenticate')
      .send({ username, password });
  }
).then(res => {
  console.log('We at least got a response from the server we hope');
  return res.body.token;
});

export const handleNewToken = (bearerToken) => {
  const [bearer, token] = bearerToken.split(' ');
  const decodedToken = jwt.decode(token);

  localStorage.setItem('token', `${bearer} ${token}`);
  localStorage.setItem('id', decodedToken.id);
  localStorage.setItem('username', decodedToken.username);
};

export const logout = () => {
  localStorage.clear();
};
