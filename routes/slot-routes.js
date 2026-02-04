import express from 'express';
import {
  createSlot,
  getProviderSlots
} from '../controllers/slot.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

const router = express.Router();

// Provider creates time slots
router.post(
  '/',
  authenticate,
  authorizeRole('provider'),
  createSlot
);

// Provider views their slots
router.get(
  '/',
  authenticate,
  authorizeRole('provider'),
  getProviderSlots
);

export default router;
