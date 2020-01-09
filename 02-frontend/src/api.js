import superagent from 'superagent';

const setUrl = req => {
  console.log('Prefixing url');
  req.url = 'http://localhost:3040/' + req.url;
  console.log('URL: ', req.url.trim());
  return req;
};

const setToken = req => {
  console.log('Setting token');
  const token = window.localStorage.getItem('token');
  if (token) {
    return req.set('authentication', token);
  }
  return req;
};

export const api = reqFn => {
  console.log('Setting wrapping arguments');
  return reqFn(superagent)
    .use(setUrl)
    .use(setToken);
};
