const express = require('express');
const registerRouter = express.Router();
const bodyParser = express.json();

const database = {
  users: [
    {
      id: 123,
      name: 'john',
      email: 'john@gmail.com',
      password: 'rookiedev',
      joined: new Date( )
    },
    {
      id: 124 ,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'starbound',
      joined: new Date( )
    }
  ]
}
registerRouter.route('/').post(bodyParser, (req, res, next) => {
  if( req.body.email === database.users[0].email  && 
    req.body.password === database.users[0].password) {
  res.json("success");
  } else {
    res.status(400).json('error logging in');
  }
})

module.exports = registerRouter;