const express = require('express');
const { getLowStockProducts } = require('../controllers/lowStockProductsController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');

const router = express.Router();

router.get('/low-stock-products', validarTokenMiddleware, getLowStockProducts);

module.exports = router;