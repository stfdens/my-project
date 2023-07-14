const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../../exceptions/InvariantError');
const MapDbToModelBooks = require('../../../utils/perpustakaan/books/books');
const NotfoundError = require('../../../exceptions/NotfoundError');
const MapDbToModelBooksId = require('../../../utils/perpustakaan/books/Books2');

class BooksService {
  constructor() {
    this._pool = new Pool();
  }

  async addBuku({ nama_buku, genre, halaman_buku }) {
    const id = `books-${nanoid(13)}`;

    const query = {
      text: 'INSERT INTO books VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, nama_buku, genre, halaman_buku],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('buku gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getBooks() {
    const query = await this._pool.query('SELECT * FROM books');
    return query.rows.map(MapDbToModelBooks);
  }

  async getBooksById({ id }) {
    const query = {
      text: 'SELECT * FROM books WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('id tidak ditemukan');
    }

    return result.rows.map(MapDbToModelBooksId);
  }

  async updateBooksById({ id }, { nama_buku, genre, halaman_buku }) {
    const query = {
      text: 'UPDATE books SET nama_buku = $1, genre = $2, halaman_buku = $3 WHERE id = $4 RETURNING id',
      values: [nama_buku, genre, halaman_buku, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('id tidak ditemukan');
    }
  }

  async deleteBookById({ id }) {
    const query = {
      text: 'DELETE FROM books WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('id tidak ditemukan');
    }
  }
}

module.exports = BooksService;
