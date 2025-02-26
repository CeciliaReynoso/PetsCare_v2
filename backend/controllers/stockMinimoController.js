const { DB } = require('../config/db');

const getLowStockProducts = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id_producto, p.nombre AS producto_nombre, p.descripcion, p.precio_costo, 
        p.stock_actual, p.stock_minimo,
        pr.id_proveedor, pr.nombre AS proveedor_nombre, pr.contacto, pr.direccion, pr.telefono, pr.email
      FROM 
        productos p
      JOIN 
        proveedores pr ON p.proveedor_id = pr.id_proveedor
      WHERE 
        p.stock_actual <= p.stock_minimo
    `;
    const result = await DB.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos con stock bajo', error });
  }
};

module.exports = {
  getLowStockProducts,
};
