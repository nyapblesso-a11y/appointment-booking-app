import {
  createAppointment as createAppointmentModel,
  getAppointmentsByClient,
  getAppointmentsByProvider,
  cancelAppointment as cancelAppointmentModel,
} from '../models/appointment-model.js';
import { getSlotById, markSlotAsBooked } from '../models/slot-model.js';

export const bookAppointment = async (clientId, slotId) => {
  const slot = await getSlotById(slotId);
  if (!slot) throw new Error('Slot not found');
  if (slot.is_booked) throw new Error('Slot already booked');

  const appointment = await createAppointmentModel(
    clientId,
    slot.provider_id,
    slotId
  );

  await markSlotAsBooked(slotId);

  return appointment;
};
export const getClientAppointments = async (clientId) => getAppointmentsByClient(clientId);

export const getProviderAppointments = async (providerId) => getAppointmentsByProvider(providerId);

export const cancelUserAppointment = async (userId, appointmentId, role) => {
  let appointments;

  if (role === 'client') {
    appointments = await getAppointmentsByClient(userId);
  } else {
    appointments = await getAppointmentsByProvider(userId);
  }

  const appointment = appointments.find(
    a => a.id === Number(appointmentId)
  );

  if (!appointment) {
    throw new Error('Appointment not found or not authorized');
  }

  return await cancelAppointmentModel(appointmentId);
};