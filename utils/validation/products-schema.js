const Joi = require('joi');

// Joi validation schema for adding a new product
const addProductSchema = Joi.object({
  modelName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

// Joi validation schema for updating a product
const updateProductSchema = Joi.object({
  modelName: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
}).min(1);

module.exports = {
  addProductSchema,
  updateProductSchema,
};
