import {
  createAppointment as createAppointmentModel,
  getAppointmentsByClient,
  getAppointmentsByProvider,
  cancelAppointment as cancelAppointmentModel,
} from '../models/appointment.model.js';

import { getSlotById, markSlotAsBooked } from './slot.service.js'; // assuming slot.service.js exists

export const bookAppointment = async (clientId, slotId) => {
  // 1️⃣ Check if slot exists
  const slot = await getSlotById(slotId);
  if (!slot) throw new Error('Slot not found');
  if (slot.is_booked) throw new Error('Slot already booked');

  // Create the appointment
  const appointment = await createAppointmentModel(clientId, slot.provider_id, slotId);

  //  Mark slot as booked
  await markSlotAsBooked(slotId);

  return appointment;
};

export const getClientAppointments = async (clientId) => {
  return await getAppointmentsByClient(clientId);
};

export const getProviderAppointments = async (providerId) => {
  return await getAppointmentsByProvider(providerId);
};

export const cancelUserAppointment = async (userId, appointmentId, role) => {
  // Only allow client or provider to cancel their own appointments
  let appointments;
  if (role === 'client') {
    appointments = await getAppointmentsByClient(userId);
  } else {
    appointments = await getAppointmentsByProvider(userId);
  }

  const appointment = appointments.find(a => a.id === parseInt(appointmentId));
  if (!appointment) throw new Error('Appointment not found or not authorized');

  return await cancelAppointmentModel(appointmentId);
};
