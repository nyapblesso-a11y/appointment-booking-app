import {
  bookAppointment,
  cancelAppointment
} from '../services/appointment.service.js';
import { isValidAppointmentStatus } from '../utils/validators.js';

export const createAppointment = async (req, res, next) => {
  try {
    const { slot_id } = req.body;
    const clientId = req.user.id;

    if (!slot_id) {
      return res.status(400).json({ message: 'Slot ID required' });
    }

    const appointment = await bookAppointment(clientId, slot_id);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    //  VALIDATION
    if (!isValidAppointmentStatus(status)) {
      return res.status(400).json({ message: 'Invalid appointment status' });
    }

    const updated = await cancelAppointment(id, status);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
