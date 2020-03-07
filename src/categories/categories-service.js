const CategoryService = {
  getAllCategories(knex) {
    return knex.select('*').from('categories');
  },
}

module.exports = CategoryService