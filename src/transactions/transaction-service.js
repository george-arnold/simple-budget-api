const TransactionService = {
  getAllTransactions(knex) {
    return knex.select('*').from('transactions');
  },
  insertTransaction(knex, newTransaction) {
    return knex
    .insert(newTransaction)
    .into('transactions')
    .returning('*') //what's this
    .then(rows => {
      return rows[0]; // and this
    });
  },
  getTransactionById(knex,transactionId){
    return knex.from('transactions').select('*').where('id', transactionId).first();
  },
  deleteTransaction(knex,id) {
    return knex('transactions').where({id}).delete();
  },
  updateTransaction(knex, id, newTransaction) {
    return knex('transactions')
      .where({ id })
      .update(newTransaction);
  }

}

module.exports = TransactionService;