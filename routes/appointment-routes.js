import express from 'express';
import {
  createAppointment,
  viewClientAppointments,
  viewProviderAppointments,
  cancelAppointment,
} from '../controllers/appointment-controller.js';

import { authenticate } from '../middlewares/auth-middleware.js';
import { authorizeRole } from '../middlewares/role-middleware.js';

const router = express.Router();

// Client books appointment
router.post('/', authenticate, authorizeRole('client'), createAppointment);

// Client views own appointments
router.get('/client', authenticate, authorizeRole('client'), viewClientAppointments);

// Provider views their appointments
router.get('/provider', authenticate, authorizeRole('provider'), viewProviderAppointments);

// Cancel appointment (both roles allowed)
router.patch('/:id/cancel', authenticate, authorizeRole('client', 'provider'), cancelAppointment);

export default router; 