// import request from 'supertest';
// import app from '../../app.js';

// let providerToken;

// beforeAll(async () => {
//   const login = await request(app)
//     .post('/auth/login')
//     .send({
//       email: 'provider@test.com',
//       password: 'password123'
//     });

//   providerToken = login.body.token;
// });

// describe('Slots', () => {
//   test('provider creates a slot', async () => {
//     const res = await request(app)
//       .post('/slot')
//       .set('Authorization', `Bearer ${providerToken}`)
//       .send({
//         start_time: '2026-02-10T10:00:00',
//         end_time: '2026-02-10T10:30:00'
//       });

//     expect(res.statusCode).toBe(201);
//     expect(res.body.slot).toBeDefined();
//   });
// });
