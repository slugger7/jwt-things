const jwt = require('jsonwebtoken');

const { authentication } = require('./config.json');
const { sleep } = require('./sleep');

const generateToken = data => jwt.sign(
  data,
  authentication.secret,
  { expiresIn: '1s' }
);

const verifyToken = token => jwt.verify(token, authentication.secret);

const decodeToken = token => jwt.decode(token);

const main = async () => {
  const token = generateToken({ name: 'Kevin Heritage' });
  console.log('Token:', token);

  await sleep(2000);

  try {
    const verifiedToken = verifyToken(token);

    console.log('Verified token:', verifiedToken);
  } catch(err) {
    console.error(err);
  }

  const decodedToken = decodeToken(token);

  console.log('Decoded token: ', decodedToken);
};

main();
