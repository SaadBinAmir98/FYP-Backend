const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().min(11).required(),
  name: Joi.string().required(),
  password: Joi.string().min(8).max(20).required(),
});

module.exports = {
  userSchema,
};
