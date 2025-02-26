const { DB } = require('../config/db');

const obtenerProductosConStockMinimo = async () => {
  const { rows } = await DB.query(`
    SELECT p.*, pr.nombre AS proveedor_nombre, pr.contacto, pr.direccion AS proveedor_direccion, pr.telefono, pr.email
    FROM productos p
    JOIN proveedores pr ON p.proveedor_id = pr.id_proveedor
    WHERE p.stock_actual <= p.stock_minimo
  `);
  return rows;
};

module.exports = {
  obtenerProductosConStockMinimo,
};