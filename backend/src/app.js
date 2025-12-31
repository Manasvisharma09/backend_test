const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/order.routes"));

// Error handling middleware (must be last)
app.use(require("./middleware/error.middleware"));

module.exports = app;
