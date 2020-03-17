const bcrypt = require('bcrypt-nodejs');

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';
  let basicToken;

  if (!authToken.toLowerCase().startsWith('basic ')) {
    return res.status(401).json({ error: 'Missing basic token' });
  } else {
    basicToken = authToken.slice('basic '.length, authToken.length);
  }
  // console.log('basic token', basicToken);
  const [tokenEmail, tokenPassword] = Buffer.from(basicToken, 'base64')
    .toString()
    .split(':');
  // console.log('tokenEmail', tokenEmail);
  // console.log('token PW', tokenPassword);
  if (!tokenEmail || !tokenPassword) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }

  //  attempted to hash tokenPassword
  const hash = bcrypt.hashSync(tokenPassword);
  function getUserWithUserName(db, email) {
    return db('users')
      .where({ email })
      .first()
  }
  
  getUserWithUserName(req.app.get('db'), tokenEmail)
  req.app
    .get('db')('login')
    .where({ email: tokenEmail })
    .first()
    .then(userLog => {
      // console.log('userpw', user.hash);
      if (!userLog) {
        return res.status(401).json({ error: 'No user' });
      }
      let compare = bcrypt.compare(tokenPassword, userLog.hash, function(err, result) {
        if (err) {
          throw err;
        }
        return result;
      })
      if (compare) {
        req.app
          .get('db')('users')
          .where({email: userLog.email})
          .first();
      }
      next();
    })
    .catch(next);
}

module.exports = {
  requireAuth
};
