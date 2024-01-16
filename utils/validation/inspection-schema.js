const Joi = require('joi');

const inspectionRequestSchema = Joi.object({
  modelName: Joi.string().required(),
  homeAddress: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.boolean().required()
});

const inspectionUpdateSchema = Joi.object({
  modelName: Joi.string(),
  homeAddress: Joi.string(),
  date: Joi.date(),
  status: Joi.boolean()
}).min(1);

module.exports = {inspectionRequestSchema,inspectionUpdateSchema};
