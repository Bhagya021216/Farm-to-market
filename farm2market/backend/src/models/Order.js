const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
      total: { type: Number, required: true }
    }
  ],
  orderTotal: { type: Number, required: true },
  status: { type: String, default: "placed", enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"] }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
