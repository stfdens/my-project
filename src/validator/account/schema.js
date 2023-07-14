const Joi = require('joi');

const schemaAccount = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  status: Joi.string().valid('murid', 'guru', 'visitor').lowercase().required(),
});

module.exports = { schemaAccount };
