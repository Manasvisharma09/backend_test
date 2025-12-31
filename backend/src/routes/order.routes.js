const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { createOrder, getOrders } = require("../controllers/order.controller");

router.post("/order", auth, createOrder);
router.get("/orders", auth, getOrders);

module.exports = router;
