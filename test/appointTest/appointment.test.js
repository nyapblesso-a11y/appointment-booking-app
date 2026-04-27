import request from 'supertest';
import app from '../../app.js';
import { describe, test, expect, beforeAll } from '@jest/globals';

let clientToken;
let providerToken;
let slotId;

beforeAll(async () => {

  // create provider
  const providerEmail = `provider${Date.now()}@test.com`;

  await request(app).post('/auth/register').send({
    name: 'Provider',
    email: providerEmail,
    password: 'password123',
    role: 'provider',
    service_name: 'Dentist'
  });

  const providerLogin = await request(app)
    .post('/auth/login')
    .send({
      email: providerEmail,
      password: 'password123'
    });

  providerToken = providerLogin.body.token;

  // create slot
  const slotRes = await request(app)
    .post('/slot')
    .set('Authorization', `Bearer ${providerToken}`)
    .send({
      start_time: '2026-02-10T11:00:00',
      end_time: '2026-02-10T11:30:00'
    });

  slotId = slotRes.body.slot.id;

  // create client
  const clientEmail = `client${Date.now()}@test.com`;

  await request(app).post('/auth/register').send({
    name: 'Client',
    email: clientEmail,
    password: 'password123',
    role: 'client'
  });

  const clientLogin = await request(app)
    .post('/auth/login')
    .send({
      email: clientEmail,
      password: 'password123'
    });

  clientToken = clientLogin.body.token;
});

describe('Appointments', () => {

  test('client books appointment', async () => {
    const res = await request(app)
      .post('/app')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ slotId });

    expect(res.statusCode).toBe(201);
  });

});