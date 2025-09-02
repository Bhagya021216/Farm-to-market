const Order = require("../models/Order");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  try {
    const { products, orderTotal } = req.body;
    if (!Array.isArray(products) || products.length === 0 || !orderTotal) {
      return res.status(400).json({ error: "products (array) and orderTotal are required" });
    }

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ error: `Product not found: ${item.product}` });
      if (product.quantityAvailable < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product: ${product.name}` });
      }
    }

    for (const item of products) {
      const product = await Product.findById(item.product);
      product.quantityAvailable -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      buyer: req.user.id,
      products,
      orderTotal
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const buyerId = req.query.buyer;
    if (!buyerId) return res.status(400).json({ error: "buyer query param required" });

    const orders = await Order.find({ buyer: buyerId })
      .populate({
        path: "products.product",
        select: "name description uom imageUrl suburb seller",
        populate: { path: "seller", select: "name address suburb" }
      });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
