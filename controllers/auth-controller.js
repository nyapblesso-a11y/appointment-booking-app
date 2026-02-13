import { createUser, findUserByEmail } from "../models/user-model.js";
import { createProvider } from "../models/provider-model.js";
import { hashPassword, comparePassword } from "../utils/passward.js";
import {
  isValidEmail,
  isValidPassword,
  isValidRole,
} from "../utils/validators.js";
import { signToken } from "../config/jwt.js";
import { sendNotification } from "../sockets/socket.js";
import { io } from "../bin/www";
import logger from "../utils/logger.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, service_name } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (!isValidEmail(email))
      return res.status(400).json({ message: "Invalid email" });
    if (!isValidPassword(password))
      return res.status(400).json({ message: "Password too short" });
    if (role && !isValidRole(role))
      return res.status(400).json({ message: "Invalid role" });

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: "Email exists" });

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === "provider") {
      await createProvider({ user_id: user.id, service_name });
    }
    logger.info(`${user.name} has successfully register`);
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    next(error);
  }
  console.log("REQ BODY:", req.body);
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });
    
    if (!isValidEmail(email))
      return res.status(400).json({ message: "Invalid email format" });

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    sendNotification(io, user.id, "Login successfull");

    // console.log("congrats: user successfully logged-in")
     logger.info (`Great! ${user.name}, you have succesfully logged-in now you can create a slot or book an appointment`)
    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
