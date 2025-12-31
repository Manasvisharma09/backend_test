const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_name: { 
    type: String, 
    required: [true, "Product name is required"],
    trim: true,
    minlength: [1, "Product name cannot be empty"]
  },
  quantity: { 
    type: Number, 
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
    validate: {
      validator: Number.isInteger,
      message: "Quantity must be an integer"
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
