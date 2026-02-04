
import { createUser, findUserByEmail } from '../models/user.model.js';
import { createProvider } from '../models/provider.model.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { isValidEmail, isValidPassword, isValidRole } from '../utils/validators.js';
import { signToken } from "../config/jwt.js";

// Register new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, service_name } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }
    if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid email' });
    if (!isValidPassword(password)) return res.status(400).json({ message: 'Password too short' });
    if (role && !isValidRole(role)) return res.status(400).json({ message: 'Invalid role' });

    // Check existing
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: 'Email exists' });

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await createUser({ name, email, password: hashedPassword, role });

    // If provider, create provider profile
    if (role === 'provider') {
      await createProvider(user.id, service_name);
    }

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email & password required' });
    if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid email format' });

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  
    const token = signToken({
      id: user.id,
      role: user.role,
    });


    res.json({ token });
  } catch (error) {
    next(error);
  }
};
