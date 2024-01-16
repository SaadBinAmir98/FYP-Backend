const { Products } = require("../models");

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Products.findAll();
  res.status(200).send(products);
};

// Get product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Products.findByPk(productId);
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.status(200).send(product);
};

// Add a new product
const addNewProduct = async (req, res) => {
  const userId = req.user.userId;
  const { name, description, price, quantity } = req.body;
  await Products.create({ userId, name, description, price, quantity });
  res.status(201).send({ message: "Product created successfully" });
};

// Update a product
const updateProduct = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.id;
  const { name, description, price, quantity } = req.body;

  const product = await Products.findOne({ where: { productId } });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  if (product.userId !== userId) {
    return res.status(401).send({ message: "User is not authorized" });
  }

  await product.update({ name, description, price, quantity });
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
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProductById,
};
