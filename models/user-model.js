import { pool } from '../config/db.js';

export const createUser = async ({name, email, password, role = 'client'}) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role;
  `;
  const { rows } = await pool.query(query, [
    name,
    email,
    password,
    role,
  ]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const query = `
    SELECT id, name, email, role
    FROM users
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
