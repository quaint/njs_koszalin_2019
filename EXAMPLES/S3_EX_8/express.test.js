
const express = require('express');
const request = require('supertest');
const app = express();

// function for test
app.use('/myurl', function(req, res, next) {

   res.status(200).json({a: 100});

});


// our test

describe('GET /myurl', () => {
  it('should return 200 and json and body', async (done) => {

    const res = await request(app)
      .get('/myurl')
      .set('Accept', 'application/json');

    expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();

    done();
  });
});


