/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accountModel = require('../models/accountModel');

class authController {
  static async login(req, res) {
    try {
      // cek username and email
      const account = await accountModel.findOne({
        $or: [{ username: req.body.username }, { email: req.body.username }],
      });
      if (!account) {
        return res.status(400).json({
          message: 'Akun tidak ditemukan',
        });
      }

      // cek password valid atau tidak
      const passwordValid = await bcrypt.compare(req.body.password, account.password);
      if (!passwordValid) {
        return res.status(400).json({
          message: 'Password salah',
        });
      }

      const token = jwt.sign({ userId: account._id }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({
        accessToken: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Terjadi kesalahan server',
      });
    }
  }
}

module.exports = authController;
