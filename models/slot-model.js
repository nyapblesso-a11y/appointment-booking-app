import { pool } from '../config/db.js';

export const createTimeSlot = async (
  providerId,
  startTime,
  endTime
) => {
  const query = `
    INSERT INTO time_slots (provider_id, start_time, end_time)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    providerId,
    startTime,
    endTime,
  ]);
  return rows[0];
};

export const getAvailableSlotsByProvider = async (providerId) => {
  const query = `
    SELECT *
    FROM time_slots
    WHERE provider_id = $1
      AND is_booked = false
    ORDER BY start_time;
  `;
  const { rows } = await pool.query(query, [providerId]);
  return rows;
};

export const markSlotAsBooked = async (slotId) => {
  const query = `
    UPDATE time_slots
    SET is_booked = true
    WHERE id = $1
      AND is_booked = false
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [slotId]);
  return rows[0];
};
