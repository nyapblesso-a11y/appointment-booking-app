import request from 'supertest';
import app from '../../app.js';
import { describe, test, expect } from '@jest/globals';


describe('Auth-Register', () => {
  test('register client successfully', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'John Client',
        email: 'client@test.com',
        password: 'password123',
        role: 'client'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('client@test.com');
  });

  test('register provider successfully', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Jane Provider',
        email: 'provider@test.com',
        password: 'password123',
        role: 'provider',
        service_name: 'Dentist'
      });

    expect(res.statusCode).toBe(201);
  });
});
