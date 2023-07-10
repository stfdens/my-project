const ClientError = require('../../exceptions/ClientError');

class NilaiHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNilaiByHandler = this.postNilaiByHandler.bind(this);
    this.getNilaiByHandler = this.getNilaiByHandler.bind(this);
    this.getNilaiByIdHandler = this.getNilaiByIdHandler.bind(this);
    this.updateNilaiByIdHandler = this.updateNilaiByIdHandler.bind(this);
    this.deleteNilaiByIdHandler = this.deleteNilaiByIdHandler.bind(this);
  }

  async postNilaiByHandler(request, h) {
    try {
      this._validator.nilaiPayload(request.payload);
      const {
        kartupelajar, instrumen, aba, abo, atg, mikro,
      } = request.payload;

      const id = await this._service.addNilai({
        kartupelajar, instrumen, aba, abo, atg, mikro,
      });

      return h.response({
        status: 'success',
        data: id,
      }).code(201);
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

  async getNilaiByHandler() {
    const datas = await this._service.getNilai();
    return {
      status: 'success',
      data: datas,
    };
  }

  async getNilaiByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const result = await this._service.getNilaiById(id);

      return h.response({
        status: 'success',
        data: result,
      }).code(200);
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

  async updateNilaiByIdHandler(request, h) {
    try {
      this._validator.nilaiPayload(request.payload);
      const { id } = request.params;
      const {
        kartupelajar, instrumen, aba, abo, atg, mikro,
      } = request.payload;

      await this._service.putNilaiById(id, {
        kartupelajar, instrumen, aba, abo, atg, mikro,
      });

      return h.response({
        status: 'success',
        message: 'data nilai berhasil diperbarui',
      }).code(200);
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

  async deleteNilaiByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteNilaiById(id);

      return h.response({
        status: 'success',
        message: 'Nilai berhasil dihapus',
      }).code(200);
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

module.exports = NilaiHandler;
