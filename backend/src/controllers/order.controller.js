const Order = require("../models/Order");

exports.createOrder = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { product_name, quantity } = req.body;

    // Check for required fields
    if (!product_name || quantity === undefined || quantity === null) {
      return res.status(400).json({ message: "Product name and quantity are required" });
    }

    // Check for empty strings
    if (!product_name.trim()) {
      return res.status(400).json({ message: "Product name cannot be empty" });
    }

    // Validate quantity is a number
    if (typeof quantity !== "number" || isNaN(quantity)) {
      return res.status(400).json({ message: "Quantity must be a valid number" });
    }

    // Validate quantity is positive integer
    if (quantity < 1 || !Number.isInteger(quantity)) {
      return res.status(400).json({ message: "Quantity must be a positive integer" });
    }

    const order = await Order.create({
      product_name: product_name.trim(),
      quantity,
      user: req.user.id
    });

    res.status(201).json(order);
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
