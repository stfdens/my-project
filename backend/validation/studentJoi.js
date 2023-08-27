const Joi = require('joi');

const createData = (data) => {
  const studentSchema = Joi.object({
    nama: Joi.string().required(),
    kelas: Joi.string().required(),
    jurusan: Joi.string(),
    nis: Joi.number().required(),
    kartupelajar: Joi.number().required(),
  });

  return studentSchema.validate(data);
};

module.exports = { createData };
