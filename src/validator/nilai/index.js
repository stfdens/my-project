const InvariantError = require('../../exceptions/InvariantError');
const { NilaiSchema } = require('./schema');

const NilaiValidatorPayload = {
  nilaiPayload: (payload) => {
    const validationResult = NilaiSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NilaiValidatorPayload;
