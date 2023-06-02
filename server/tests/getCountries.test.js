const { jest, describe, it, expect, afterAll } = require('jest');
const request = require('supertest');
const server = require('../src/app');
const { countries } = require('../src/database/databaseConnection');

describe('GET /', () => {
  it('Should respond with a status of 200 if you can log in', async () => {
    await request(server).get('/').expect(200);
  });

  it('Should respond with status 204 if search value is missing or less than 3 characters', async () => {
    await request(server).get('/countries').expect(204);
  });

  it('Should respond with status 200 and return countries if search value is provided', async () => {
    const response = await request(server)
      .get('/countries')
      .query({ value: 'ina' })
      .expect(200);

    expect(response.body).toHaveProperty('countries');
    expect(Array.isArray(response.body.countries)).toBe(true);
  });

  it('Should respond with status 200 and return `No countries found` message if no countries match the search', async () => {
    const response = await request(server)
      .get('/countries')
      .query({ value: 'nonexistentcountry' })
      .expect(200);

    expect(response.body).toHaveProperty('message', 'No countries found');
  });

  it('Should respond with status 500 and error message if an error occurs during the search', async () => {
    jest
      .spyOn(countries, 'findAll')
      .mockRejectedValueOnce(new Error('Database error'));

    const response = await request(server)
      .get('/countries')
      .query({ value: 'country' })
      .expect(500);

    expect(response.body).toHaveProperty(
      'message',
      'Error while searching for countries'
    );
  });

  afterAll((done) => {
    server.close(() => {
      console.info('Server closed');
      done();
    });
  });
});
