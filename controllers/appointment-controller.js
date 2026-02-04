import {
  createAppointment,
  getAppointmentsByClient,
  getAppointmentsByProvider,
  cancelAppointment,
} from '../services/appointment.service.js';

// Client books appointment
export const bookAppointment = async (req, res, next) => {
  try {
    const { slot_id } = req.body;
    if (!slot_id) return res.status(400).json({ message: 'Slot ID required' });

    const appointment = await createAppointment(req.user.id, slot_id);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Client views their appointments
export const myAppointments = async (req, res, next) => {
  try {
    const appointments = await getAppointmentsByClient(req.user.id);
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// Provider views appointments for their slots
export const providerAppointments = async (req, res, next) => {
  try {
    const appointments = await getAppointmentsByProvider(req.user.id);
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// Cancel appointment
export const cancel = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await cancelAppointment(req.user.id, appointmentId);
    res.json({ message: 'Appointment canceled', appointment });
  } catch (error) {
    next(error);
  }
};
