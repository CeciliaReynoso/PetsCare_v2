const express = require('express');
const { getProductosConStockMinimo } = require('../controllers/stockMinimoController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

// Obtener productos con stock mínimo
router.get('/productos/stock_minimo', validarTokenMiddleware, getProductosConStockMinimo);

module.exports = router;