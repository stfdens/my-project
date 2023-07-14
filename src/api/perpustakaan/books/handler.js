const ClientError = require('../../../exceptions/ClientError');

class BooksHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postBooksByHandler = this.postBooksByHandler.bind(this);
    this.getBooksByHandler = this.getBooksByHandler.bind(this);
    this.getBooksByIdHandler = this.getBooksByIdHandler.bind(this);
    this.updateBooksByIdHandler = this.updateBooksByIdHandler.bind(this);
    this.deleteBooksByIdHandler = this.deleteBooksByIdHandler.bind(this);
  }

  async postBooksByHandler(request, h) {
    try {
      await this._validator.PerpusBooksValidate(request.payload);
      const book = await this._service.addBuku(request.payload);

      const response = h.response({
        status: 'success',
        serialId: book,
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
        message: 'Maaf terjadi kesalahan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getBooksByHandler() {
    const books = await this._service.getBooks();
    return ({
      title: 'success',
      data: {
        books,
      },
    });
  }

  async getBooksByIdHandler(request, h) {
    try {
      const book = await this._service.getBooksById(request.params);

      const response = h.response({
        status: 'success',
        data: book,
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

  async updateBooksByIdHandler(request, h) {
    try {
      await this._validator.PerpusBooksValidate(request.payload);
      await this._service.updateBooksById(request.params, request.payload);

      const response = h.response({
        status: 'success',
        message: 'books berhasil diperbarui',
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

  async deleteBooksByIdHandler(request, h) {
    try {
      await this._service.deleteBookById(request.params);

      return h.response({
        status: 'success',
        message: 'books berhasil dihapus',
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
        message: 'Maaf terjadi kesalahan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = BooksHandler;
