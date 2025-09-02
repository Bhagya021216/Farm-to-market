const express = require("express");
const auth = require("../middleware/auth");
const { updateProfile, getSellerDetails, getUserDetails } = require("../controllers/userController");
const router = express.Router();

router.put("/me", auth, updateProfile);
router.get("/seller/:id", getSellerDetails);
router.get("/:id", auth, getUserDetails);

module.exports = router;
