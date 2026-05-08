import express from 'express';
import {
  createTimeSlot,
  getProviderSlots,
  getPublicProviderSlots
} from '../controllers/slot-controller.js';

import { authenticate } from '../middlewares/auth-middleware.js';
import { authorizeRole } from '../middlewares/role-middleware.js';

const router = express.Router();

// Provider creates a time slot
router.post('/', authenticate, authorizeRole('provider'), createTimeSlot);

// Provider views OWN slots
router.get('/me', authenticate, authorizeRole('provider'), getProviderSlots);

// Client views available slots for a provider
router.get('/:providerId', authenticate, getPublicProviderSlots);

export default router;