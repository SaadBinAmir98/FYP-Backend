const Joi = require('joi');

const inspectionRequestSchema = Joi.object({
  modelName: Joi.string().required(),
  homeAddress: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.boolean().required()
});

module.exports = {inspectionRequestSchema};
