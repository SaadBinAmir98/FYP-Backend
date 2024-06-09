const { Products, Users } = require("../models");
const { baseUrl } = require('../config'); // Assuming you have a configuration file with the base URL
const path = require('path');

// Function to append base URL to imageUri
const appendBaseUrl = (products) => {
  return products.map(product => ({
    ...product.toJSON(),
    imageUri: product.imageUri ? `${baseUrl}${product.imageUri}` : null
  }));
};

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Products.findAll({
    attributes: ['productId', 'modelName', 'description', 'price', 'quantity', 'isFeaturedAd', 'imageUri'],
    include: {
      model: Users,
      attributes: ['contactNumber']
    }
  });
  res.status(200).send(appendBaseUrl(products));
};

// Get products by name
const getProductsByName = async (req, res) => {
  const modelName = req.params.modelName;
  const products = await Products.findAll({
    where: { modelName },
    attributes: ['productId', 'modelName', 'description', 'price', 'quantity', 'isFeaturedAd', 'imageUri'],
    include: {
      model: Users,
      attributes: ['contactNumber']
    }
  });
  if (products.length === 0) {
    return res.status(404).send({ message: "No products found with this name" });
  }
  res.status(200).send(appendBaseUrl(products));
};

// Get product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Products.findOne({
    where: { productId },
    attributes: ['productId', 'modelName', 'description', 'price', 'quantity', 'isFeaturedAd', 'imageUri'],
    include: {
      model: Users,
      attributes: ['contactNumber']
    }
  });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.status(200).send({
    ...product.toJSON(),
    imageUri: product.imageUri ? `${baseUrl}${product.imageUri}` : null
  });
};

// Get products list of the logged-in user
const getUserProducts = async (req, res) => {
  const userId = req.params.userId;
  const products = await Products.findAll({
    where: { userId },
    attributes: ['productId', 'modelName', 'description', 'price', 'quantity', 'isFeaturedAd', 'imageUri'],
    include: {
      model: Users,
      attributes: ['contactNumber']
    }
  });

  if (products.length === 0) {
    return res.status(404).send({ message: "No products found for this user" });
  }

  res.status(200).send(appendBaseUrl(products));
};

// Add a new product
const addNewProduct = async (req, res) => {
  const userId = req.user.userId;
  const { modelName, description, price, quantity, isFeaturedAd } = req.body;

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
