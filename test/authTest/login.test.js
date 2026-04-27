import request from 'supertest';
import app from '../../app.js';
import { describe, test, expect } from '@jest/globals';

describe('Auth-Login', () => {

  test('login returns JWT token', async () => {
    const email = `login${Date.now()}@test.com`;

    // create user 
    await request(app).post('/auth/register').send({
      name: 'Test User',
      email,
      password: 'password123'
    });

    const res = await request(app)
      .post('/auth/login')
      .send({
        email,
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('reject invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'wrong@test.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
  });

});