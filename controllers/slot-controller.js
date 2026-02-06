import { createSlot, getSlotsByProviderId } from '../models/slot-model.js';
import { getProviderByUserId } from '../models/provider-model.js';

// Provider creates a new time slot
export const createTimeSlot = async (req, res, next) => {
  try {
    const { start_time, end_time } = req.body;

    if (!start_time || !end_time) {
      return res.status(400).json({ message: 'start_time and end_time are required' });
    }

    const provider = await getProviderByUserId(req.user.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }

    const slot = await createSlot({
      provider_id: provider.id,
      start_time,
      end_time
    });

    res.status(201).json({ success: true, slot });
  } catch (error) {
    next(error);
  }
};

// Provider views all slots
export const getProviderSlots = async (req, res, next) => {
  try {
    const provider = await getProviderByUserId(req.user.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }

    const slots = await getSlotsByProviderId(provider.id);
    res.json({ success: true, slots });
  } catch (error) {
    next(error);
  }
};

