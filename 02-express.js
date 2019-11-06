const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const datastore = require('nedb');
const jwt = require('jsonwebtoken');

const { port, authentication: { secret, expiresIn } } = require('./config.json');
const users = new datastore({ filename: 'users.db', autoload: true });

const generateToken = data => jwt.sign(
  data,
  secret,
  { expiresIn }
);

const verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      reject(err);
    }
    resolve(decodedToken);
  });
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.post('/authenticate', (req, res, next) => {
  const { body } = req;
  users.findOne(body, (err, user) => {
    if (err) {
      next(err);
    }

    const token = generateToken({ id: user._id, username: user.username });
    res.json({ token: `Bearer ${token}`});
  });
});

app.get('/verify', (req, res, next) => {
  const [_, token] = req.headers.authentication.split(' ');

  verifyToken(token)
    .then(decodedToken => {
      res.json(decodedToken);
    })
    .catch(err => {
      res.status(401).send(err);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
