const express = require("express");
const auth = require("../middleware/auth");
const {
  getTopCustomers,
  getTopProducts,
  getMonthlySales,
  getSellerStats
} = require("../controllers/analyticsController");
const router = express.Router();

router.get("/top-customers", auth, getTopCustomers);
router.get("/top-products", auth, getTopProducts);
router.get("/monthly-sales", auth, getMonthlySales);
router.get("/seller-stats", auth, getSellerStats);

module.exports = router;