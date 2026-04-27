import request from 'supertest';
import app from '../../app.js';
import { describe, test, expect } from '@jest/globals';

describe('Auth-Login', () => {
  test('login returns JWT token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'client@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('reject invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'client@test.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
  });
});
