// import request from 'supertest';
// import app from '../../app.js';

// let clientToken;
// let slotId;

// beforeAll(async () => {
//   const login = await request(app)
//     .post('/auth/login')
//     .send({
//       email: 'client@test.com',
//       password: 'password123'
//     });

//   clientToken = login.body.token;

//   const slots = await request(app)
//     .get('/slot');

//   slotId = slots.body.slots[0].id;
// });

// describe('Appointments', () => {
//   test('client books appointment', async () => {
//     const res = await request(app)
//       .post('/app')
//       .set('Authorization', `Bearer ${clientToken}`)
//       .send({ slotId });

//     expect(res.statusCode).toBe(201);
//     expect(res.body.appointment).toBeDefined();
//   });
// });
