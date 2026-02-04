
import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validateRegister, validateLogin } from '../utils/validators.js';

const router = express.Router();

// Register user
router.post('/register', validateRegister, register);

// Login user
router.post('/login', validateLogin, login);

export default router;
