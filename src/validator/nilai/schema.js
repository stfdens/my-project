const Joi = require('joi');

const NilaiSchema = Joi.object({
  kartupelajar: Joi.number().required(),
  instrumen: Joi.number().max(100).required(),
  aba: Joi.number().max(100).required(),
  abo: Joi.number().max(100).required(),
  atg: Joi.number().max(100).required(),
  mikro: Joi.number().max(100).required(),
});

module.exports = { NilaiSchema };
