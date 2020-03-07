const express = require('express');
const categoriesRouter = express.Router();
const CategoryService = require('./categories-service');

const serializeCategory = category => ({
  id: category.id,
  name: category.name
});

categoriesRouter
.route('/')
.get((req, res, next) => {
  CategoryService.getAllCategories(req.app.get('db'))
  .then(categories => {
    res.json(categories.map(serializeCategory));
  })
  .catch(next)
});

module.exports = categoriesRouter;