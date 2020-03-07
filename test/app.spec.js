const app = require('../src/app');
const knex = require('knex');

describe('Categories endpoints', function() {
  let db;
  let testCategories = [{ name: 'Video games' }, { name: 'Other' }, { name: 'Gifts' }];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => {
    return db.into('categories').insert(testCategories);
  });

  after(() => db.destroy());

  describe('Categories', () => {
    it('responds with 200', () => {
      return supertest(app)
        .get('/api/categories')
        .expect(200);
    });
  });
});
