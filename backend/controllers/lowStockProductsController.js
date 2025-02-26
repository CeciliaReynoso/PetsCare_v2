const { obtenerProductosConStockBajo } = require('../models/lowStockProductsModel');

const getLowStockProducts = async (req, res) => {
  try {
    const productos = await obtenerProductosConStockBajo();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos con stock bajo', error });
  }
};

module.exports = {
  getLowStockProducts,
};
