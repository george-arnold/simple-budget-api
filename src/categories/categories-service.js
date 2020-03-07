const CategoryService = {
  getAllCategories(knex) {
    return knex.select('*').from('categories');
  },
}
console.log(CategoryService);
module.exports = CategoryService