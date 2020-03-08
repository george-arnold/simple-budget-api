const express = require('express');
const categoriesRouter = express.Router();
const CategoryService = require('./categories-service');
const bodyParser = express.json();

//what does this do?
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
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { name } = req.body;
    const newCategory = { name };
    //add catch if no name
    CategoryService.insertCategory(req.app.get('db'), newCategory)
      .then(category => {
        res
          .status(201)
          .location(`${category.id}`)
          .json(serializeCategory(category));
      })
      .catch(next);
  });

categoriesRouter
  .route('/:categoryId')
  .all((req, res, next) => {
    const { categoryId } = req.params;
    CategoryService.getById(req.app.get('db'), categoryId)
      .then(category => {
        res.category = category;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeCategory(res.category));
  })
  .delete((req, res, next) => {
    const { categoryId } = req.params;
    console.log(categoryId);
    CategoryService.deleteCategory(req.app.get('db'), categoryId)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const { name } = req.body;
    const categoryToUpdate = { name };
    CategoryService.updateCategory(req.app.get('db'), req.params.categoryId, categoryToUpdate)
    .then(numRowsAffected => {
      res.status(202).end();
    })
    .catch(next);
  });

module.exports = categoriesRouter;