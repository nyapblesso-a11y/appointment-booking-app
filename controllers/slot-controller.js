import { createSlot, getSlotsByProviderId } from '../models/slot-model.js';
import { getProviderByUserId } from '../models/provider-model.js';

// Provider creates a new time slot
export const createTimeSlot = async (req, res, next) => {
  try {
    const { start_time, end_time } = req.body;


    const provider = await getProviderByUserId(req.user.id);
    if (!provider) return res.status(404).json({ message: 'Provider profile not found' });

    const slot = await createSlot(provider.id, start_time, end_time);
    res.status(201).json(slot);
  } catch (error) {
    next(error);
  }
};

// Provider views all slots
export const getProviderSlots = async (req, res, next) => {
  try {
    const provider = await getProviderByUserId(req.user.id);
    if (!provider) return res.status(404).json({ message: 'Provider profile not found' });

    const slots = await getSlotsByProviderId(provider.id);
    res.json(slots);
  } catch (error) {
    next(error);
  }
};

