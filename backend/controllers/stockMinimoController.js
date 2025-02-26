const StockMinimo = require('../models/stockMinimoModel');

exports.getProductosConStockMinimo = async (req, res) => {
  try {
    const productos = await StockMinimo.obtenerProductosConStockMinimo();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos con stock mínimo', error });
  }
};