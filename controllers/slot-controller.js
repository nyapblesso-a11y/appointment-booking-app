import { createSlot, getProviderSlots } from '../models/slot.model.js';
import { isValidTimeSlot } from '../utils/validators.js';

export const createTimeSlot = async (req, res, next) => {
  try {
    const { start_time, end_time } = req.body;
    const providerId = req.user.id;

    //  VALIDATION
    
    if (!isValidTimeSlot(start_time, end_time)) {
      return res.status(400).json({ message: 'Invalid time slot range' });
    }

    const slot = await createSlot({
      providerId,
      start_time,
      end_time
    });

    res.status(201).json(slot);
  } catch (error) {
    next(error);
  }
};

export const listProviderSlots = async (req, res, next) => {
  try {
    const providerId = req.user.id;
    const slots = await getProviderSlots(providerId);
    res.json(slots);
  } catch (error) {
    next(error);
  }
};
