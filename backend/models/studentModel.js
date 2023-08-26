/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  nama: {
    type: String,
  },
  kelas: {
    type: String,
  },
  jurusan: {
    type: String,
  },
  nis: {
    type: Number,
  },
  kartupelajar: {
    type: Number,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('student', studentSchema);
