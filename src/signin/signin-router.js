const express = require('express');
const signinRouter = express.Router();
const bodyParser = express.json();
const registerRouter = express.Router();

const database = {
  users: [
    {
      id: 123,
      name: 'john',
      email: 'john@gmail.com',
      password: 'rookiedev',
      joined: new Date(),
      categories: [ {
        id: 100,
        name: 'bills'
      }],
      transactions: [{ 
        id: 40,
        venue: 'safeway',
        amount: 100,
        comments: 'looks good',
        categoryId: 100,
      }],
    },
    {
      id: 124,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'starbound',
      joined: new Date(),
      categories: [ {
        id: 100,
        name: 'bills'
      }],
      transactions: [{ 
        id: 40,
        venue: 'safeway',
        amount: 100,
        comments: 'looks good',
        categoryId: 100,
      }],
    }
  ]
};
signinRouter.route('/signin').post(bodyParser, (req, res, next) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0]); 
  } else {
    res.status(400).json('error logging in');
  }
});

signinRouter.route('/register').post(bodyParser, (req, res, next) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: 125,
    name: name,
    email: email,
    joined: new Date(),
    categories: [],
    transactions: [],
  });
  res.json(database.users[database.users.length - 1]);
});

signinRouter.route('/profile/:id').get((req, res) => {
  const { id } = req.params;
  const found = false;
  database.users.forEach(user => {
    console.log(user);
    console.log(user.id);
    if (user.id == id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('no matching user');
  }
});
module.exports = signinRouter;
