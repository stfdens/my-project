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
      const {
        nama, jurusan, nisn, nis,
      } = request.payload;

      const data = await this._service.addMurid({
        nama, jurusan, nisn, nis,
      });

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
      const { id } = request.params;

      const dataMurid = await this._service.getMuridById(id);

      const response = h.response({
        status: 'success',
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

  async updateMuridByIdHandler(request, h) {
    try {
      this._validator.validateMurid(request.payload);
      const { id } = request.params;
      const {
        nama, jurusan, nisn, nis,
      } = request.payload;

      const dataMurid = await this._service.updateMuridById(id, {
        nama, jurusan, nisn, nis,
      });

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
      const { id } = request.params;

      await this._service.deleteMuridById(id);

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
