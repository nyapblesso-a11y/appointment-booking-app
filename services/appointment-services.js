import {
  createAppointment as createAppointmentModel,
  getAppointmentsByClient,
  getAppointmentsByProvider,
  cancelAppointment as cancelAppointmentModel,
} from '../models/appointment-model.js';

import {
  getSlotById,
  markSlotAsBooked
} from '../models/slot-model.js';

// BOOK APPOINTMENT
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

// CLIENT VIEW
export const getClientAppointments = async (clientId) => {
  return getAppointmentsByClient(clientId);
};

// PROVIDER VIEW (IMPORTANT FIX)
export const getProviderAppointments = async (userId) => {
  const { getProviderByUserId } = await import('../models/provider-model.js');

  const provider = await getProviderByUserId(userId);

  if (!provider) throw new Error('Provider not found');

  return getAppointmentsByProvider(provider.id);
};

// CANCEL
export const cancelUserAppointment = async (userId, appointmentId, role) => {
  let appointments;

  if (role === 'client') {
    appointments = await getAppointmentsByClient(userId);
  } else {
    const { getProviderByUserId } = await import('../models/provider-model.js');

    const provider = await getProviderByUserId(userId);

    if (!provider) throw new Error('Provider not found');

    appointments = await getAppointmentsByProvider(provider.id);
  }

  const appointment = appointments.find(
    a => a.id === parseInt(appointmentId)
  );

  if (!appointment) {
    throw new Error('Appointment not found or not authorized');
  }

  return cancelAppointmentModel(appointmentId);
};