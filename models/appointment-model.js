import { pool } from '../config/db.js';

export const createAppointment = async (userId, providerId, timeSlot) => {
  const query = `
    INSERT INTO appointments (user_id, provider_id, slot_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    userId,
    providerId,
    timeSlot
  ]);
  return rows[0];
};
