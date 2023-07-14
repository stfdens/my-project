const InvariantError = require('../../../exceptions/InvariantError');
const { schemaPerpusBooks } = require('./schema');

const ValidatePerpusBooks = {
  PerpusBooksValidate: (payload) => {
    const validationResult = schemaPerpusBooks.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ValidatePerpusBooks;
