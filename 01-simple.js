const jwt = require('jsonwebtoken');

const { authentication } = require('./config.json');
const { sleep } = require('./sleep');

const generateToken = data => jwt.sign(
  { data },
  authentication.secret,
  { expiresIn: '1s' }
);

const decodeToken = token => jwt.verify(token, authentication.secret);

const main = async () => {
  const token = generateToken({ name: 'Kevin Heritage' });
  console.log('Token:', token);

  await sleep(2000);

  const decodedToken = decodeToken(token);

  console.log('Decoded token:', decodedToken); 
};

main();
