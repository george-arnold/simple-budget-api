const express = require('express');
const signinRouter = express.Router();
const bodyParser = express.json();
const bcrypt = require('bcrypt-nodejs');

signinRouter.route('/signin').post(bodyParser, (req, res) => {
  req.app
    .get('db')
    .select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return req.app
          .get('db')
          .select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('unable to get user'));
      } else {
        res.status(400).json('first wrong credentials');
      }
    })
    .catch(err => res.status(400).json('second wrong credentials'));
});
signinRouter.route('/register').post(bodyParser, (req, res) => {
  const { email, name, password } = req.body;
  console.log('password input by new user',password)
  const hash = bcrypt.hashSync(password);
  console.log( 'new user hash', hash);
  req.app.get('db').transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({ email: loginEmail[0], name: name, joined: new Date() })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
});

module.exports = signinRouter;
