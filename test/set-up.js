import { pool } from '../config/db.js';

beforeAll(async () => {
  await pool.query('DELETE FROM appointments');
  await pool.query('DELETE FROM time_slots'); 
  await pool.query('DELETE FROM providers');
  await pool.query('DELETE FROM users');
});

afterAll(async () => {
  await pool.end();
});