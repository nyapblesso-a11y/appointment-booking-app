import request from 'supertest';
import app from '../../app.js';
import { describe, test, expect, beforeAll } from '@jest/globals';

let providerToken;

beforeAll(async () => {
  const email = `provider${Date.now()}@test.com`;

  await request(app).post('/auth/register').send({
    name: 'Provider',
    email,
    password: 'password123',
    role: 'provider',
    service_name: 'Dentist'
  });

  const login = await request(app)
    .post('/auth/login')
    .send({
      email,
      password: 'password123'
    });

  providerToken = login.body.token;
});

describe('Slots', () => {
  test('provider creates a slot', async () => {
    const res = await request(app)
      .post('/slot')
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        start_time: '2026-02-10T10:00:00',
        end_time: '2026-02-10T10:30:00'
      });

    expect(res.statusCode).toBe(201);
  });
});