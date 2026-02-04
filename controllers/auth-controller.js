
import { createUser, findUserByEmail } from "../models/user-model.js";
import { hashPassword, comparePassword } from "../utils/passward.js";
import {
  isValidEmail,
  isValidPassword,
  isValidRole,
} from "../utils/validators.js";
import { signToken } from "../config/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (role && !isValidRole(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // VALIDATION

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const token = signToken({
      id: user.id,
      role: user.role,
    });

    return res.json({ token });
  } catch (error) {
    next(error);
  }
};
