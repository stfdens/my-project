/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const accountModel = require('../models/accountModel');
const { responseDefault } = require('../utils/responseMessage');
const { accountValidation } = require('../validation/accountJoi');

class accountController {
  static async postAccount(req, res) {
    try {
      // validation
      const { error } = await accountValidation(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      // data exist
      const dataExist = await accountModel.findOne({ email: req.body.email });
      if (dataExist) {
        return res.status(400).json({
          message: 'data sudah ada',
        });
      }

      const { password } = req.body;
      const hasepassword = await bcrypt.hash(password, 10);
      await accountModel.create({ ...req.body, password: hasepassword });
      res.status(201).json({
        message: responseDefault.CREATED_DATA,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getdata(req, res) {
    try {
      const data = await accountModel.find();
      res.status(200).json({
        message: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getDatById(req, res) {
    try {
      const validId = mongoose.isValidObjectId(req.params.id);
      if (!validId) {
        return res.status(400).json({
          message: 'data tidak ada',
        });
      }

      const response = await accountModel.findById(req.params.id);
      if (!response) {
        return res.status(400).json({
          message: 'data tidak ada',
        });
      }

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateById(req, res) {
    try {
      const validId = await mongoose.isValidObjectId(req.params.id);
      if (!validId) {
        res.status(400).json({
          message: 'data tidak ada',
        });
      }

      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await accountModel.findByIdAndUpdate(req.params.id, { ...req.body, password: hashedPassword });
      res.status(200).json({
        message: 'data berhasil diupdate',
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteDataById(req, res) {
    try {
      const validId = await mongoose.isValidObjectId(req.params.id);
      if (!validId) {
        res.status(400).json({
          message: 'data tidak ditemukan',
        });
      }
      await accountModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: 'data berhasil dihapus',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = accountController;
