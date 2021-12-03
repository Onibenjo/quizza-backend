/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');

const app = require('../app');

describe('Documentation Route', () => {
  it('should redirect to documentation page', async () => {
    const res = await request(app).get('/api/v1/documentation');
    expect(res.statusCode).toEqual(302);
  });
});

describe('404 Route', () => {
  it('should return 404', async () => {
    const res = await request(app).get('*');
    expect(res.statusCode).toEqual(404);
  });
});
