import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Resume from "../models/Resume.js";

// Signup functionality
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields are required" });
    }

    // check if user already exists or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    newUser.password = undefined; // hide password in response

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Login functionality
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields are required" });
    }

    // check if user already register or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if password is valid or not
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.password = undefined; // hide password in response

    return res
      .status(201)
      .json({ message: "Login successful", user: user, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = undefined;
    return res.status(200).json({user})
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all User Resumes
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId });
    return res.status(200).json({ resumes: resumes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}