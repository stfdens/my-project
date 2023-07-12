const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const MapDbToModelNilai = require('../../utils/nilai/MapDbToModelNilai');
const NotfoundError = require('../../exceptions/NotfoundError');

class NilaiService {
  constructor() {
    this._pool = new Pool();
  }

  async addNilai({
    kartupelajar, instrumen, aba, abo, atg, mikro,
  }) {
    const id = nanoid(13);

    const query = {
      text: 'INSERT INTO nilai VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, kartupelajar, instrumen, aba, abo, atg, mikro],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Nilai gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getNilai() {
    const query = await this._pool.query('SELECT * FROM nilai');
    return query.rows.map(MapDbToModelNilai);
  }

  async getNilaiById({ id }) {
    const query = {
      text: 'SELECT * FROM nilai WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('Id tidak ditemukan');
    }

    return result.rows.map(MapDbToModelNilai)[0];
  }

  async putNilaiById({ id }, {
    kartupelajar, instrumen, aba, abo, atg, mikro,
  }) {
    const query = {
      text: 'UPDATE nilai SET kartupelajar = $1, instrumen = $2, aba = $3, abo = $4, atg = $5, mikro = $6 WHERE id = $7 RETURNING id',
      values: [kartupelajar, instrumen, aba, abo, atg, mikro, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('Id tidak ditemukan');
    }
  }

  async deleteNilaiById({ id }) {
    const query = {
      text: 'DELETE FROM nilai WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('Id tidak ditemukan');
    }
  }
}

module.exports = NilaiService;
