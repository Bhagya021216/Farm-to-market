const Product = require("../models/Product");
const mongoose = require("mongoose");
const { initGridFS } = require("../utils/gridfs");

exports.addProduct = async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      uom: req.body.uom,
      quantityAvailable: req.body.quantityAvailable ?? 0,
      price: req.body.price,
      seller: req.user.id,
      suburb: req.body.suburb,
      type: req.body.type
    };

    if (req.body.image && req.body.imageType) {
      const buffer = Buffer.from(req.body.image, "base64");
      const gfs = initGridFS(mongoose.connection);
      const uploadStream = gfs.openUploadStream(
        `${Date.now()}-${payload.name}`,
        { contentType: req.body.imageType }
      );
      uploadStream.end(buffer);
      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });
      payload.image = {
        gridFsId: uploadStream.id,
        contentType: req.body.imageType
      };
    }

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.image || !product.image.gridFsId) {
      return res.status(404).send("Image not found");
    }
    const gfs = initGridFS(mongoose.connection);
    const downloadStream = gfs.openDownloadStream(product.image.gridFsId);

    res.set("Content-Type", product.image.contentType || "image/jpeg");

    downloadStream.on("error", () => {
      res.status(404).send("Image not found in storage");
    });

    downloadStream.pipe(res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { sellerId, suburb, name, isAvailable, type } = req.query;
    const query = {};

    if (sellerId) query.seller = sellerId;
    if (isAvailable === "true") query.quantityAvailable = { $gt: 0 };
    if (name) query.name = { $regex: name, $options: "i" };
    if (type) query.type = type;
    if (suburb) query.suburb = suburb;

    const products = await Product.find(query)
      .populate("seller", "name address.role address.suburb role");

    const productsWithImageUrls = products.map((product) => {
      const obj = product.toObject();
      if (obj.image && obj.image.gridFsId) {
        obj.imageUrl = `/products/${obj._id}/image`;
      } else {
        obj.imageUrl = null;
      }
      delete obj.image;
      return obj;
    });

    res.json(productsWithImageUrls);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });

    const productsWithImageUrls = products.map(product => {
      const obj = product.toObject();
      if (obj.image && obj.image.gridFsId) {
        obj.imageUrl = `/products/${obj._id}/image`;
      } else {
        obj.imageUrl = null;
      }
      delete obj.image;
      return obj;
    });

    res.json(productsWithImageUrls);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};