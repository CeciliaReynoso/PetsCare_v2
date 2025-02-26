const { obtenerProductosConStockMinimo } = require('../models/stockMinimoModel');

const getProductosConStockMinimo = async (req, res) => {
  try {
    const productos = await obtenerProductosConStockMinimo();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos con stock mínimo', error });
  }
};

module.exports = {
  getProductosConStockMinimo,
};