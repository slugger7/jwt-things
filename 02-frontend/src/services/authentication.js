import jwt from 'jsonwebtoken';
import { api } from './api';
const { localStorage } = window;

export const authenticateUser = (username, password) => api(
  req => req
    .post('authenticate')
    .send({ username, password })
).then(res => res.body.token);

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

export const verifyToken = () => api(

)
