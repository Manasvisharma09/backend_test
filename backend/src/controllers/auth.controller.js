const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check for empty fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for empty strings after trim
    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({ message: "Fields cannot be empty" });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    
    // Create user (mongoose will validate email format and other constraints)
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashed 
    });

    res.status(201).json({ 
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    // Handle duplicate key error (email unique constraint)
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ message: "Email and password cannot be empty" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};
