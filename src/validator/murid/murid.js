const Joi = require('joi');

const schemaMurid = Joi.object({
  nama: Joi.string().required(),
  jurusan: Joi.string().required(),
  nisn: Joi.number().required(),
  nis: Joi.number().required,
});

module.exports = { schemaMurid };
