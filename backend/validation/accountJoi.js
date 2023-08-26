const Joi = require('joi');

const accountValidation = (data) => {
  const Accountvalidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return Accountvalidation.validate(data);
};

module.exports = { accountValidation };
