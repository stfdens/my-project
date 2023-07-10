const ClientError = require('./ClientError');

class NotfoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotfoundError';
  }
}

module.exports = NotfoundError;
