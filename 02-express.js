const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const datastore = require('nedb');
const jwt = require('jsonwebtoken');

const { port, authentication: { secret, expiresIn } } = require('./config.json');
const users = new datastore({ filename: 'users.db', autoload: true });

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  req.jwt = {
    generate: data => jwt.sign(
      data,
      secret,
      { expiresIn }
    ),
    decode: token => jwt.verify(token, secret)
  };

  next();
});

app.use((req, res, next) => {
  const authentication = req.headers.authentication;
  if (authentication) {
    const [bearer, token] = authentication.split(' ');

    req.jwt.data = req.jwt.decode(token);
  }

  next();
});

app.post('/authenticate', (req, res, next) => {
  const { body } = req;
  users.findOne(body, (err, user) => {
    if (err) {
      next(err);
    }

    const token = req.jwt.generate({ id: user._id, username: user.username });
    res.json({ token: `Bearer ${token}`});
  });
});

app.get('/verify', (req, res, next) => {
  res.json(req.jwt.data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
