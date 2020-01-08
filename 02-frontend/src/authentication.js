import superagent from 'superagent';

export const authenticateUser = (username, password) => superagent
  .post('http://localhost:3040/authenticate')
  .send({ username, password })
  .then(res => {
    return res.body.token;
  });


