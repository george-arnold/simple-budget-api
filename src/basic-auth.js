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
  console.log('tokenEmail', tokenEmail);
  console.log('token PW', tokenPassword);
  if (!tokenEmail || !tokenPassword) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }

  //  attempted to hash tokenPassword
  const hash = bcrypt.hashSync(tokenPassword);

  req.app
    .get('db')('login')
    .where({ email: tokenEmail })
    .first()
    .then(user => {
      // console.log('userpw', user.hash);
      if (!user) {
        return res.status(401).json({ error: 'No user' });
      }
      console.log('hashed token pw', hash, 'hashed user input @ register', user.hash);
      // This just caused a 500 error 
      //return bcrypt.compare(tokenPassword, user.hash).then(passwordsMatch => {
      //   if (!passwordsMatch) {
      //     return res.status(401).json({ error: 'Unauthorized request' });
      //   }
        //  this did not work as user.hash was never equal to hash for some unknown reason
        if (user.hash !== hash) {
          return res.status(401).json({ error: 'wrong PW' });
        }

        req.user = user;
        next();
    })
    .catch(next);
}

module.exports = {
  requireAuth
};
