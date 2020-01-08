import superagent from 'superagent';
import { serializeError } from 'serialize-error';

export const authenticateUser = (username, password) => superagent
  .post('http://localhost:3040/authenticate')
  .send({ username, password })
  .then(res => {
    return res.body.token;
  });
