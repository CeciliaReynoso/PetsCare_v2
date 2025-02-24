const express = require('express');
const { obtenerProductosTienda } = require('../controllers/tiendaController');
const router = express.Router();

router.get('/productos/tienda', obtenerProductosTienda);

module.exports = router;