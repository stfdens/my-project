const { default: mongoose, mongo } = require('mongoose');
const studentModel = require('../models/studentModel');
const { responseDefault } = require('../utils/responseMessage');
const { createData } = require('../validation/studentJoi');

class studentController {
  static async addData(req, res) {
    try {
      // validation
      const { error } = createData(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      // cek nis sama
      const nis = await studentModel.findOne({ nis: req.body.nis });
      if (nis) {
        return res.status(400).json({
          message: 'nis tidak boleh sama dengan orang lain',
        });
      }

      const response = await studentModel.create(req.body);
      res.status(201).json({
        message: responseDefault.CREATED_DATA,
        data: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllData(req, res) {
    try {
      const response = await studentModel.find();
      res.status(200).json({
        messsage: 'success',
        data: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getDataById(req, res) {
    try {
      // cek id apakah ada atau tidak
      const validId = mongoose.isValidObjectId(req.params.id);
      if (!validId) {
        return res.status(400).json({
          message: 'id yang dimasukan tidak ada',
        });
      }

      const response = await studentModel.findById(req.params.id);
      res.status(200).json({
        message: 'success',
        data: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateDataById(req, res) {
    try {
      const cekId = mongoose.isValidObjectId(req.params.id);
      if (!cekId) {
        return res.status(400).json({
          message: 'tidak ada id dengan data ini',
        });
      }

      await studentModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        message: 'id berhasil diperbarui',
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteDataById(req, res) {
    try {
      // cek id
      const validId = mongoose.isValidObjectId(req.params.id);
      if (!validId) {
        return res.status(400).json({
          message: 'tidak ada id',
        });
      }

      await studentModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        messagge: responseDefault.DELETE_DATA,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = studentController;
