const express = require("express");
const auth = require("../middleware/auth");
const {
  addProduct,
  getProducts,
  getSellerProducts,
  getProductImage
} = require("../controllers/productController");
const router = express.Router();

router.post("/", auth, addProduct);
router.get("/", getProducts);
router.get("/mine", auth, getSellerProducts);
router.get("/:id/image", getProductImage);

module.exports = router;