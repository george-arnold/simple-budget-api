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
    app.set('db', db);
  });

  before(() => {
    return db.into('categories').insert(testCategories);
  });

  after(() => db.destroy());

  describe('Categories', () => {
    it('responds with 200 on get request', () => {
      return supertest(app)
        .get('/api/categories')
        .expect(200);
    });

    it('responds with 201 on post request', () => {
      return supertest(app)
        .post('/api/categories')
        .send({
          name: 'test-name-category'
        })
        .expect(201);
    });
    it('responds 200 to specific category GET', () => {
      return supertest(app)
        .get('/api/categories/100')
        .expect(200);
    });
  //need help here
    it('responds 204 with delete reqest', () => {
      return supertest(app)
        .delete('api/categories/100')
        .expect(204);
    });
  });
});
