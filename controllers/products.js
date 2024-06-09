const { Products, Users } = require("../models");
const path = require('path');

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Products.findAll({
    include: {
      model: Users,
      attributes: ['contactNumber']
    }
  });
  res.status(200).send(products);
};

// Get products by name
const getProductsByName = async (req, res) => {
  const modelName = req.params.modelName;
  const products = await Products.findAll({
    where: { modelName },
    include: {
      model: Users,
      attributes: ['contactNumber']
    }
  });
  if (products.length === 0) {
    return res.status(404).send({ message: "No products found with this name" });
  }
  res.status(200).send(products);
};

// Get product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Products.findOne({
    where: { productId },
    include: {
      model: Users,
      attributes: ['contactNumber']
    }
  });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.status(200).send(product);
};

// Get products list of the logged-in user
const getUserProducts = async (req, res) => {
  const userId = req.params.userId;
  const products = await Products.findAll({
    where: { userId },
    include: {
      model: Users,
      attributes: ['contactNumber']
    }
  });

  if (products.length === 0) {
    return res.status(404).send({ message: "No products found for this user" });
  }

  res.status(200).send(products);
};

// Add a new product
const addNewProduct = async (req, res) => {
  const userId = req.user.userId;
  const { modelName, description, price, quantity, isFeaturedAd } = req.body;

  try {
    // Save the file path to the database
    const imageUri = req.file ? `/uploads/${req.file.filename}` : null;

    await Products.create({
      userId,
      modelName,
      description,
      price,
      quantity,
      isFeaturedAd,
      imageUri 
    });

    res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to create product", error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.id;
  const { modelName, description, price, quantity } = req.body;

  const product = await Products.findOne({ where: { productId } });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  if (product.userId !== userId) {
    return res.status(401).send({ message: "User is not authorized" });
  }

  await product.update({ modelName, description, price, quantity });
  res.status(200).send({ message: "Product updated successfully" });
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.id;

  const product = await Products.findOne({ where: { productId } });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  if (product.userId !== userId) {
    return res.status(401).send({ message: "User is not authorized" });
  }

  await product.destroy();
  res.status(200).send({ message: "Product deleted successfully" });
};

module.exports = {
  getAllProducts,
  getProductsByName,
  getProductById,
  getUserProducts,
  addNewProduct,
  updateProduct,
  deleteProductById,
};
