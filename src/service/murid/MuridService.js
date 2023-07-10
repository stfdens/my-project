const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const MapDbToModelMurid = require('../../utils/MapDbToModel');
const NotfoundError = require('../../exceptions/NotfoundError');

class MuridService {
  constructor() {
    this._pool = new Pool();
  }

  async addMurid({
    nama, jurusan, nisn, nis,
  }) {
    const query = {
      text: 'INSERT INTO murid (nama, jurusan, nisn, nis) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [nama, jurusan, nisn, nis],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Murid gagal ditambahkan');
    }

    return result.rows[0];
  }

  async getAllmurid() {
    const query = await this._pool.query('SELECT * FROM murid');
    return query.rows.map(MapDbToModelMurid);
  }

  async getMuridById(id) {
    const query = {
      text: 'SELECT * FROM murid WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('Id tidak ditemukan');
    }

    return result.rows.map(MapDbToModelMurid);
  }

  async updateMuridById(id, {
    nama, jurusan, nisn, nis,
  }) {
    const query = {
      text: 'UPDATE murid SET nama = $1, jurusan = $2, nisn = $3, nis = $4 WHERE id = $5 RETURNING id',
      values: [nama, jurusan, nisn, nis, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('Gagal update Id tidak ditemukan');
    }
  }

  async deleteMuridById(id) {
    const query = {
      text: 'DELETE FROM murid WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('Gagal menghapus murid Id tidak ditemukan');
    }
  }
}

module.exports = MuridService;
