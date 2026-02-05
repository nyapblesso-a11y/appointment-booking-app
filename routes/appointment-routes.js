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

router.post('/', authenticate, authorizeRole('client'), createAppointment);
router.get('/client', authenticate, authorizeRole('client'), viewClientAppointments);
router.get('/provider', authenticate, authorizeRole('provider'), viewProviderAppointments);
router.patch('/:id/cancel', authenticate, cancelAppointment);

export default router;

