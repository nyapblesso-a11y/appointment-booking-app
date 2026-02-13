import {pool} from '../config/db.js';

export const createAppointment = async (
  clientId,
  providerId,
  slotId
) => {
  const query = `
    INSERT INTO appointments (client_id, provider_id, slot_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    clientId,
    providerId,
    slotId,
  ]);
  return rows[0];
};

export const getAppointmentsByClient = async (clientId) => {
  const query = `
    SELECT *
    FROM appointments
    WHERE client_id = $1
  `;
  const { rows } = await pool.query(query, [clientId]);
  return rows;
};

export const getAppointmentsByProvider = async (providerId) => {
  const query = `
    SELECT *
    FROM appointments
    WHERE provider_id = $1
  `;
  const { rows } = await pool.query(query, [providerId]);
  return rows;
};

export const cancelAppointment = async (appointmentId) => {
  const query = `
    UPDATE appointments
    SET status = 'canceled'
    WHERE id = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [appointmentId]);
  return rows[0];
};
