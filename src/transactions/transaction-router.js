const express = require('express');
const transactionsRouter = express.Router();
const TransactionService = require('./transaction-service');
const bodyParser = express.json();
const path = require('path');

//what does this do?
const serializeTransaction = transaction => ({
  id: transaction.id,
  venue: transaction.venue,
  amount: transaction.amount,
  comments: transaction.comments,
  categoryId: transaction.categoryid
});

transactionsRouter
  .route('/')
  .get((req, res, next) => {
    TransactionService.getAllTransactions(req.app.get('db'))
      .then(transactions => {
        res.json(transactions.map(serializeTransaction));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { venue, amount, comments, categoryid } = req.body;
    const newTransaction = { venue, amount, comments, categoryid };
    //add catch if no venue
    TransactionService.insertTransaction(req.app.get('db'), newTransaction)
      .then(transaction => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${transaction.id}`))
          .json(serializeTransaction(transaction));
      })
      .catch(next);
  });

transactionsRouter.route('/:transactionId').all(
  (req,
  res,
  next) => {
    TransactionService.getTransactionById(req.app.get('db'), req.params.transactionId)
      .then(transaction => {
        if (!transaction) {
          return res.status(404).json({
            error: { message: `Transaction does not exist` }
          });
        }
        res.transaction = transaction;
        next();
      })
      .catch(next);
  })
  .get((req,res, next) =>{
    res.json(serializeTransaction(res.transaction));
  })
  .delete((req, res, next) => {
    TransactionService.deleteTransaction(req.app.get('db'), req.params.transactionId)
    .then(numRowsAffected => {
      res.status(202).json({ info: { numRowsAffected: numRowsAffected } }), end()
  })
  .catch(next);
  })

  .patch(bodyParser, (req,res,next) => {
    const {venue, amount, comments } = req.body 
    const transactionToUpdate = {venue, amount, comments}

    TransactionService.updateTransaction(req.app.get('db'), req.params.transactionId, transactionToUpdate )
    .then(numRowsAffected => {
      res.status(204).json({ info: { numRowsAffected: numRowsAffected } }), end();
    })
    .catch(next);
  })


module.exports = transactionsRouter;
