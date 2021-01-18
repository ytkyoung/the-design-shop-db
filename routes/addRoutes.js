const express = require('express');
const addRoutes = express.Router();

const addController = require('../controllers/addController');

addRoutes.get('/', addController.add_get);

addRoutes.post('/', addController.add_post);

module.exports = addRoutes;
