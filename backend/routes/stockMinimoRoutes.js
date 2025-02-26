const express = require('express');
const router = express.Router();
const { getLowStockProducts } = require('../models/stockMinimoModel');

// Obtener productos con stock mínimo
router.get('/productos/stock_minimo', async (req, res) => {
  try {
    const productos = await getLowStockProducts();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos con stock mínimo:', error);
    res.status(500).json({ error: 'Error al obtener productos con stock mínimo' });
  }
});

module.exports = router;