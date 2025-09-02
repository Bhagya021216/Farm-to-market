const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { name, role, address } = req.body;
    const allowedRoles = ["buyer", "seller"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, role, address } },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSellerDetails = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id).select("name address role");
    if (!seller || seller.role !== "seller") return res.status(404).json({ error: "Seller not found" });
    res.json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
