const SigninService = {
  insertUser(knex, newUser) {
    return knex
    .insert(newUser)
    .into('users')
    .returning('*') 
    .then(rows => {
      return rows[0]; 
    });
  },
  getById(knex,userId){
    return knex.from('users').select('*').where('id', userId).first();
  },
}

module.exports = SigninService;