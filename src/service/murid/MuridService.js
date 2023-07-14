/* eslint-disable import/no-unresolved */
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const MapDbToModelMurid = require('../../utils/murid/MapDbToModel');
const NotfoundError = require('../../exceptions/NotfoundError');
const MuridAndNilai = require('../../utils/murid/muridandnilai');
const MapDbToModelAllMurid = require('../../utils/murid/AllMurid');

class MuridService {
  constructor() {
    this._pool = new Pool();
  }

  async addMurid({
    nama, jurusan, kelas, nisn, kartupelajar,
  }) {
    const query = {
      text: 'INSERT INTO murid (nama, jurusan, kelas, nisn, kartupelajar) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [nama, jurusan, kelas, nisn, kartupelajar],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Murid gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllmurid() {
    const query = await this._pool.query('SELECT * FROM murid');
    return query.rows.map(MapDbToModelAllMurid);
  }

  async getMuridById({ id }) {
    const query = {
      text: 'SELECT * FROM murid WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('Id tidak ditemukan');
    }

    return result.rows.map(MapDbToModelMurid)[0];
  }

  async getMuridDanNilai({ id }) {
    const query = {
      text: 'select * from nilai join murid on nilai.kartupelajar = murid.kartupelajar WHERE murid.id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows.map(MuridAndNilai);
  }

  async updateMuridById({ id }, {
    nama, jurusan, kelas, nisn, kartupelajar,
  }) {
    const query = {
      text: 'UPDATE murid SET nama = $1, jurusan = $2, kelas = $3, nisn = $4, kartupelajar = $5 WHERE id = $6 RETURNING id',
      values: [nama, jurusan, kelas, nisn, kartupelajar, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('Gagal update Id tidak ditemukan');
    }
  }

  async deleteMuridById({ id }) {
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
