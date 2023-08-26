const express = require('express');
const accountController = require('../controller/accountController');

const route = express.Router();

route.post('/daftar', accountController.postAccount);
route.get('/sign', accountController.getdata);
route.get('/sign/:id', accountController.getDatById);
route.put('/signup/:id', accountController.updateById);
route.delete('/sign/:id', accountController.deleteDataById);

module.exports = route;
