const Joi = require('joi');

const NilaiSchema = Joi.object({
  kartupelajar: Joi.number().required(),
  instrumen: Joi.number().required(),
  aba: Joi.number().required(),
  abo: Joi.number().required(),
  atg: Joi.number().required(),
  mikro: Joi.number().required(),
});

module.exports = { NilaiSchema };
