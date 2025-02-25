const { DB } = require('../config/db');

const getDetProductById = async (id) => {
  const productQuery = `
    SELECT p.*, s.descripcion AS subcategoria_descripcion, pr.nombre AS proveedor_nombre
    FROM productos p
    JOIN subcategorias s ON p.subcategoria_id = s.id_subcategoria
    JOIN proveedores pr ON p.proveedor_id = pr.id_proveedor
    WHERE p.id_producto = $1
  `;
  const result = await DB.query(productQuery, [id]);
  return result.rows[0];
};

module.exports = {
  getDetProductById,
};