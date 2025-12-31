const app = require("./src/app");
require("dotenv").config();
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
