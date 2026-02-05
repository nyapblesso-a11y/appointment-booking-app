import express from 'express';
import {
  createTimeSlot,
  getProviderSlots,
} from '../controllers/slot-controller.js';

import { authenticate } from '../middlewares/auth-middleware.js';
import { authorizeRole } from '../middlewares/role-middleware.js';

const router = express.Router();

// Provider creates a time slot
router.post('/', authenticate, authorizeRole('provider'), createTimeSlot);

// Client views available slots for a provider
router.get('/:providerId', authenticate, getProviderSlots);

export default router;
