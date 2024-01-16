const Joi = require('joi');

const sellitForMeRequestSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  Address: Joi.string().required(),
  mobileDescription: Joi.string().required(),
  inspectionSlot: Joi.string().valid('Coming Monday', 'Coming Tuesday', 'Coming Wednesday', 'Coming Thursday', 'Coming Friday', 'Coming Saturday', 'Coming Sunday').required(),
  inspectionTime: Joi.string().valid('10:00 AM', '12:00 AM', '02:00 AM', '04:00 AM', '06:00 AM').required()
});

module.exports = {sellitForMeRequestSchema};
