const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/ClientError');
const NotfoundError = require('../../exceptions/NotfoundError');
const MapDbToModelAccount = require('../../utils/account/account');

class AccountService {
  constructor() {
    this._pool = new Pool();
  }

  async addUsers({
    username, email, password, status,
  }) {
    const createdat = new Date().toISOString();
    const updatedat = createdat;
    // verifikasi username
    await this.verifyNewUser(username);

    // membuat users
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO account (username, status, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [username, status, email, hashedPassword, createdat, updatedat],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal mendaftarkan users');
    }

    return result.rows[0].id;
  }

  async verifyNewUser(username) { // identifikasi user jika blm ada
    const query = {
      text: 'SELECT username FROM account WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user, username sudah');
    }
  }

  async getDetailAcc({ id }) {
    const query = {
      text: 'SELECT * FROM account WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('id tidak ditemukan');
    }

    return result.rows.map(MapDbToModelAccount);
  }

  async updateAccount({ id }, { username, email, password }) {
    const updatedat = new Date().toISOString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'UPDATE account SET username = $1, email = $2, password = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [username, email, hashedPassword, updatedat, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('id tidak ditemukan');
    }
  }

  async deleteAccount({ id }) {
    const query = {
      text: 'DELETE FROM account WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotfoundError('id tidak ditemukan');
    }
  }
}

module.exports = AccountService;
