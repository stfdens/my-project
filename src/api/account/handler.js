const ClientError = require('../../exceptions/ClientError');

class AccountHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAccountByHandler = this.postAccountByHandler.bind(this);
    this.getAccountByUsersHandler = this.getAccountByUsersHandler.bind(this);
    this.updateAccountByUsersHandler = this.updateAccountByUsersHandler.bind(this);
    this.deleteAccountByUsersHandler = this.deleteAccountByUsersHandler.bind(this);
  }

  async postAccountByHandler(request, h) {
    try {
      this._validator.AccountValidator(request.payload);

      const data = await this._service.addUsers(request.payload);

      const response = h.response({
        status: 'success',
        message: 'account berhail dibuat',
        accountId: data,
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf terjadi kesalahan pada serverkami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getAccountByUsersHandler(request, h) {
    try {
      const result = await this._service.getDetailAcc(request.params);

      const response = h.response({
        status: 'success',
        data: result,
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf terjadi kesalahan pada serverkami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async updateAccountByUsersHandler(request, h) {
    try {
      this._validator.AccountValidator(request.payload);

      await this._service.updateAccount(request.params, request.payload);

      const response = h.response({
        status: 'success',
        message: 'Account berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf terjadi kesalahan pada serverkami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteAccountByUsersHandler(request, h) {
    try {
      await this._service.deleteAccount(request.params);

      const response = h.response({
        status: 'success',
        message: 'users berhasil dihapus',
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf terjadi kesalahan pada serverkami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = AccountHandler;
