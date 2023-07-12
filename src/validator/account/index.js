const InvariantError = require('../../exceptions/InvariantError');
const { schemaAccount } = require('./schema');

const AccountPayload = {
  AccountValidator: (payload) => {
    const validationResult = schemaAccount.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AccountPayload;
