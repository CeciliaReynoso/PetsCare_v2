// para obtener los productos en promoción
const { DB } = require('../config/db');

const obtenerProductosTienda = async (req, res) => {
  try {
    const result = await DB.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos para tienda' });
  }
};

module.exports = { obtenerProductosTienda };