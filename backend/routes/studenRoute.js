const express = require('express');
const cookieParsier = require('cookie-parser');
const studentController = require('../controller/studenController');
const authenticateJWT = require('../Middleware/authenticateJWT'); // Import middleware

const route = express.Router();

route.use(cookieParsier());
route.use(authenticateJWT);

// CRUD SISWA
route.post('/addData', studentController.addData);
route.get('/getData', studentController.getAllData);
route.get('/getData/:id', studentController.getDataById);
route.put('/updateData/:id', studentController.updateDataById);
route.delete('/deleteData/:id', studentController.deleteDataById);

module.exports = route;
