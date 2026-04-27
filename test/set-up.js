import { pool } from '../config/db.js';
import { initDB } from '../config/initDB.js';

beforeAll(async () => {
  await initDB(); 

  await pool.query('DELETE FROM appointments');
  await pool.query('DELETE FROM time_slots');
  await pool.query('DELETE FROM providers');
  await pool.query('DELETE FROM users');
});

afterAll(async () => {
  await pool.end();
});