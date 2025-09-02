const express = require("express");
const auth = require("../middleware/auth");
const { placeOrder, getMyOrders } = require("../controllers/orderController");
const router = express.Router();

router.post("/", auth, placeOrder);
router.get("/", getMyOrders);

module.exports = router;
