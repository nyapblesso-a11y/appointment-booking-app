import express from 'express';
import {
  bookAppointment,
  cancelAppointment
} from '../controllers/appointment.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

const router = express.Router();

// Client books an appointment
router.post(
  '/',
  authenticate,
  authorizeRole('client'),
  bookAppointment
);

// Client cancels appointment
router.patch(
  '/:id/cancel',
  authenticate,
  authorizeRole('client'),
  cancelAppointment
);

export default router;
