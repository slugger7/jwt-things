import superagent from 'superagent';

const setUrl = req => {
  req.url = 'http://localhost:3040/' + req.url;
  return req;
};

const setToken = req => {
  const token = window.localStorage.getItem('token');
  if (token) {
    return req.set('authentication', token);
  }
  return req;
};

export const api = reqFn => reqFn(superagent)
  .use(setUrl)
  .use(setToken);
