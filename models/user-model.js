import { pool } from '../config/db.js';

export const createUser = async (email, password) => {
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email;
  `;
  const { rows } = await pool.query(query, [email, password]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};
