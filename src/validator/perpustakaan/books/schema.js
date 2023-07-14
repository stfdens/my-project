const Joi = require('joi');

const schemaPerpusBooks = Joi.object({
  nama_buku: Joi.string().required(),
  genre: Joi.string().required(),
  halaman_buku: Joi.number().required(),
});

module.exports = { schemaPerpusBooks };
