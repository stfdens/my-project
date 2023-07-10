const InvariantError = require('../../exceptions/InvariantError');
const { schemaMurid } = require('./murid');

const validateMuridPayload = {
  validateMurid: (payload) => {
    const validationResult = schemaMurid.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = validateMuridPayload;
