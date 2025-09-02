const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        uom: { type: String, default: "" },
        quantityAvailable: { type: Number, default: 0 },
        image: {
            gridFsId: mongoose.Schema.Types.ObjectId,
            contentType: String,
        },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        suburb: { type: String, default: "" },
        price: { 
            type: Number, 
            required: true,
            set: v => Number(Number(v).toFixed(2))
        },
        type: { type: String, default: "" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);