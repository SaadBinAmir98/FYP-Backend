const Joi = require('joi');

const inspectionRequestSchema = Joi.object({
  productId: Joi.number().required(),
  date: Joi.date().required(),
  homeAddress: Joi.string().required(),
  status: Joi.boolean().required()
});

const inspectionUpdateSchema = Joi.object({
  date: Joi.date(),
  homeAddress: Joi.string(),
  status: Joi.boolean()
}).min(1);

module.exports = {inspectionRequestSchema,inspectionUpdateSchema};
                                                          