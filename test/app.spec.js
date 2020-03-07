
const app = require('../src/app')

describe('Categories', () => {
  it('GET / responds with 200')
  return supertest(app)
  .get('/api/categories')
  .expect(200)
})

