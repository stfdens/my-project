const ClientError = require('../../exceptions/ClientError');

class MuridHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postMuridByHandler = this.postMuridByHandler.bind(this);
    this.getMuridByHandler = this.getMuridByHandler.bind(this);
    this.getMuridByIdHandler = this.getMuridByIdHandler.bind(this);
    this.updateMuridByIdHandler = this.updateMuridByIdHandler.bind(this);
    this.deleteMuridByIdHandler = this.deleteMuridByIdHandler.bind(this);
  }

  async postMuridByHandler(request, h) {
    try {
      this._validator.validateMurid(request.payload);

      const data = await this._service.addMurid(request.payload);

      const response = h.response({
        status: 'success',
        message: 'Anda telah terdaftar',
        data: {
          data,
        },
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

  async getMuridByHandler() {
    const dataMurid = await this._service.getAllmurid();
    return {
      status: 'success',
      data: dataMurid,
    };
  }

  async getMuridByIdHandler(request, h) {
    try {
      const dataMurid = await this._service.getMuridById(request.params);
      // const nilais = await this._service.getMuridDanNilai(request.params);

      const response = h.response({
        status: 'success',
        data: {
          ...dataMurid,
          // nilai: nilais,
        },
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
        message: 'Maaf terjadi kesalahan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async updateMuridByIdHandler(request, h) {
    try {
      this._validator.validateMurid(request.payload);

      const dataMurid = await this._service.updateMuridById(request.params, request.payload);

      const response = h.response({
        stats: 'success',
        message: 'data berhasil diperbarui',
        data: dataMurid,
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
        message: 'Maaf terjadi kesalahan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteMuridByIdHandler(request, h) {
    try {
      await this._service.deleteMuridById(request.params);

      const response = h.response({
        status: 'success',
        message: 'berhasil menghapus murid',
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
        message: 'Maaf terjadi kesalahan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = MuridHandler;
