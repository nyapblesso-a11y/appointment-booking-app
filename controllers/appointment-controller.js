import {
  bookAppointment,
  getClientAppointments,
  getProviderAppointments,
  cancelUserAppointment,
} from '../services/appointment-services.js';

// POST /app
export const createAppointment = async (req, res, next) => {
  try {
    const { slot_id } = req.body;
    if (!slot_id) return res.status(400).json({ message: 'slotId is required' });

    const appointment = await bookAppointment(req.user.id, slot_id);
    res.status(201).json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
};

// GET /app/client
export const viewClientAppointments = async (req, res, next) => {
  try {
    const appointments = await getClientAppointments(req.user.id);
    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

// GET /app/provider
export const viewProviderAppointments = async (req, res, next) => {
  try {
    const appointments = await getProviderAppointments(req.user.id);
    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

// PATCH /app/:id/cancel
export const cancelAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await cancelUserAppointment(req.user.id, id, req.user.role);
    res.json({ success: true, message: 'Appointment canceled', appointment });
  } catch (error) {
    next(error);
  }
};
