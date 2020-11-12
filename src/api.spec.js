const app = require('./api')
const supertest = require('supertest')

const { init } = require('./init')
/**
 * Init database
 */
init()

describe('API', () => {
  let request
  beforeEach(() => {
    request = supertest(app)
  })

  test('should return ', done => {
    request
      .get(`/save-random-image/akita`)
      .expect(201, (err, res) => {
        expect(res.body.dogImage).toMatchObject(
          expect.objectContaining({
            id: expect.any(Number),
            base64image: expect.any(String),
            breed: expect.any(String),
          }),
        );
        done()
      })
  })
})
