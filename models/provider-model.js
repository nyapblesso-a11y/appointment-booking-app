import { pool } from '../config/db.js';

export const createProvider = async ({user_id, service_name}) => {
  const query = `
    INSERT INTO providers (user_id, service_name)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    user_id,
    service_name,
  ]);
  return rows[0];
};

export const getProviderByUserId = async (user_id) => {
  const query = `
    SELECT * FROM providers WHERE user_id = $1
  `;
  const { rows } = await pool.query(query, [user_id]);
  return rows[0];
};

export const getProviderById = async (id) => {
  const query = `SELECT * FROM providers WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
