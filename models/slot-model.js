import pool from '../config/db.js';

// Create a new slot for a provider
export const createSlot = async (providerId, start_time, end_time) => {
  const query = `
    INSERT INTO time_slots (provider_id, start_time, end_time)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [providerId, start_time, end_time]);
  return rows[0];
};

// Get all slots for a provider
export const getSlotsByProviderId = async (providerId) => {
  const query = `
    SELECT * FROM time_slots
    WHERE provider_id = $1
    ORDER BY start_time ASC;
  `;
  const { rows } = await pool.query(query, [providerId]);
  return rows;
};

// Get a slot by ID
export const getSlotById = async (slotId) => {
  const query = `
    SELECT * FROM time_slots WHERE id = $1;
  `;
  const { rows } = await pool.query(query, [slotId]);
  return rows[0];
};

// Mark a slot as booked
export const markSlotAsBooked = async (slotId) => {
  const query = `
    UPDATE time_slots
    SET is_booked = TRUE
    WHERE id = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [slotId]);
  return rows[0];
};
