const { DB } = require('../config/db');

const getLowStockProducts = async () => {
  const productosQuery = `
    SELECT p.*, pr.nombre AS proveedor_nombre, pr.contacto, pr.direccion AS proveedor_direccion, pr.telefono, pr.email
    FROM productos p
    JOIN proveedores pr ON p.proveedor_id = pr.id_proveedor
    WHERE p.stock_actual <= p.stock_minimo
  `;
  const result = await DB.query(productosQuery);
  return result.rows;
};

module.exports = {
  getLowStockProducts,
};