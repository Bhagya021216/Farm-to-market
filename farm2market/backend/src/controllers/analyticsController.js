const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

exports.getTopCustomers = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const sellerProducts = await Product.find({ seller: sellerId }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);

    const topCustomers = await Order.aggregate([
      { $unwind: "$products" },
      { $match: { "products.product": { $in: productIds } } },
      {
        $group: {
          _id: "$buyer",
          totalSpent: { $sum: "$products.total" },
          totalQuantity: { $sum: "$products.quantity" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
    ]);

    const populated = await User.populate(topCustomers, { path: "_id", select: "name email" });

    res.json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const sellerProducts = await Product.find({ seller: sellerId }).select("_id name");

    const productIds = sellerProducts.map((p) => p._id);

    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      { $match: { "products.product": { $in: productIds } } },
      {
        $group: {
          _id: "$products.product",
          totalSold: { $sum: "$products.quantity" },
          totalRevenue: { $sum: "$products.total" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
    ]);

    const populated = await Product.populate(topProducts, { path: "_id", select: "name" });

    res.json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMonthlySales = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const sellerProducts = await Product.find({ seller: sellerId }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);

    const monthlySales = await Order.aggregate([
      { $unwind: "$products" },
      { $match: { "products.product": { $in: productIds } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalRevenue: { $sum: "$products.total" },
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formatted = monthlySales.map((s) => {
      const [year, month] = (s._id || "").split("-");
      return {
        ...s,
        month: monthNames[parseInt(month, 10) - 1] || s._id,
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSellerStats = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const sellerProducts = await Product.find({ seller: sellerId }).select("_id");
    const productIds = sellerProducts.map((p) => p._id);

    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const firstDayThisMonthCopy = new Date(firstDayThisMonth);

    const getStats = async (start, end) => {
      const stats = await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end } } },
        { $unwind: "$products" },
        { $match: { "products.product": { $in: productIds } } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$products.total" },
            totalItemsSold: { $sum: "$products.quantity" },
            orderTotals: { $push: "$orderTotal" }
          }
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            totalItemsSold: 1,
            averageOrderTotal: {
              $cond: [
                { $gt: [{ $size: "$orderTotals" }, 0] },
                { $avg: "$orderTotals" },
                0
              ]
            }
          }
        }
      ]);
      return stats[0] || { totalRevenue: 0, totalItemsSold: 0, averageOrderTotal: 0 };
    };

    const currentMonthStats = await getStats(firstDayThisMonth, firstDayNextMonth);
    const lastMonthStats = await getStats(firstDayLastMonth, firstDayThisMonthCopy);

    res.json({
      currentMonth: currentMonthStats,
      lastMonth: lastMonthStats
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
