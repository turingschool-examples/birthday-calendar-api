const request = require('supertest');
require('@babel/polyfill');
const app = require('./server.js');

describe('API', () => {
  let birthdays;

  beforeEach(() => {
    birthdays = [
      {
        id: 1,
        name: 'Scott',
        month: 3,
        day: 1
      },
      {
        id: 2,
        name: 'Kayla',
        month: 5,
        day: 15
      }
    ]

    app.locals.birthdays = birthdays;
  });

  describe('GET /api/v1/birthdays', () => {
    it('should return a status of 200', async () => {
      const response = await request(app).get('/api/v1/birthdays');

      expect(response.statusCode).toBe(200);
    });

    it('should respond with an array of birthdays', async () => {
      const response = await request(app).get('/api/v1/birthdays');

      expect(response.body).toEqual(birthdays);
    });
  });

  describe('POST /api/v1/birthdays', () => {
    it('should return a status of 201 and the new birthday', async () => {
      const goodBirthdayBody = { name: 'Jeff', month: 8, day: 5 };
      const expected = {...goodBirthdayBody, id: 3}
      Date.now = jest.fn().mockImplementationOnce(() => 3);

      expect(app.locals.birthdays.length).toBe(2);

      const response = await request(app).post('/api/v1/birthdays').send(goodBirthdayBody);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expected);
      expect(app.locals.birthdays.length).toBe(3);
    });

    it('should return an error', async () => {
      const badReservationBody = { name: 'Jeff', day: 5 };
      const expected = { error: 'Expected format { name: <String>, month: <Number>, day: <Number> }. You are missing a required parameter.' };

      expect(app.locals.birthdays.length).toBe(2);

      const response = await request(app).post('/api/v1/birthdays').send(badReservationBody);

      expect(response.status).toBe(422);
      expect(response.body).toEqual(expected);
      expect(app.locals.birthdays.length).toBe(2);
    });
  });

  describe('DELETE /api/v1/birthdays', () => {
    it('should return a status of 202 and the updated birthdays', async () => {
      const expected = [{
        id: 1,
        name: 'Scott',
        month: 3,
        day: 1
      }];

      expect(app.locals.birthdays.length).toBe(2);

      const response = await request(app).delete('/api/v1/birthdays/2');

      expect(response.status).toBe(202);
      expect(response.body).toEqual(expected);
      expect(app.locals.birthdays.length).toBe(1);
    });

    it('should return an error', async () => {
      const expected = { error: 'No birthday found with an id of 10.' };

      expect(app.locals.birthdays.length).toBe(2);

      const response = await request(app).delete('/api/v1/birthdays/10');

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expected);
      expect(app.locals.birthdays.length).toBe(2);
    });
  });
})
