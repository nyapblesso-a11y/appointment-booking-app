import { pool } from '../config/db.js';

export const createProvider = async (userId, name) => {
  const query = `
    INSERT INTO providers (user_id, service_name)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [userId, name]);
  return rows[0];
};

export const getProviders = async () => {
  const { rows } = await pool.query(`SELECT * FROM providers`);
  return rows;
};
