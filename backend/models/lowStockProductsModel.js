const { DB } = require('../config/db');

const obtenerProductosConStockBajo = async () => {
  const query = `
    SELECT 
      p.id_producto, p.nombre AS producto_nombre, p.descripcion, p.precio_venta, p.precio_costo, 
      p.stock_actual, p.stock_minimo, p.imagen_url, 
      pr.id_proveedor, pr.nombre AS proveedor_nombre, pr.contacto, pr.direccion, pr.telefono, pr.email
    FROM 
      productos p
    JOIN 
      proveedores pr ON p.proveedor_id = pr.id_proveedor
    WHERE 
      p.stock_actual <= p.stock_minimo
  `;
  const { rows } = await DB.query(query);
  return rows;
};

module.exports = {
  obtenerProductosConStockBajo,
};
