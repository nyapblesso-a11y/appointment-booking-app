import request from 'supertest';
import app from '../../app.js';
import { describe, test, expect } from '@jest/globals';

describe('Auth-Register', () => {

  test('register client successfully', async () => {
    const email = `client${Date.now()}@test.com`;

    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'John Client',
        email,
        password: 'password123',
        role: 'client'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(email);
  });

  test('register provider successfully', async () => {
    const email = `provider${Date.now()}@test.com`;

    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Jane Provider',
        email,
        password: 'password123',
        role: 'provider',
        service_name: 'Dentist'
      });

    expect(res.statusCode).toBe(201);
  });

});