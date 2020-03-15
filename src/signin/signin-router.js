const express = require('express');
const signinRouter = express.Router();
const bodyParser = express.json();
const bcrypt = require('bcrypt-nodejs');
const SigninService = require('./signin-service');

const serializeRegister = user => ({
  id: user.id,
  email: user.email,
  name: user.name,
  joined: new Date()
});

const serializeSignin = user => ({
  id: user.id,
  email: user.email,

})

signinRouter.route('/signin').post(bodyParser, (req, res, next) => {

  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});

signinRouter.route('/register').post(bodyParser, (req, res, next) => {
  const { email, name, password } = req.body;
  const newUser = { email, name, joined: new Date() };

  SigninService.insertUser(req.app.get('db'), newUser)
    .then(user => {
      res.status(201).json(serializeRegister(user));
    })
    .catch(next);
});

module.exports = signinRouter;
