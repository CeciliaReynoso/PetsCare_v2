// src/views/LowStockProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';

const LowStockProducts = () => {
  const { token } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const response = await axios.get(`${ENDPOINT.lowStockProducts}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductos(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchLowStockProducts();
  }, [token]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Listado de Productos menor o igual al Stock Mínimo</h1>
      {productos.length === 0 ? (
        <p>No hay productos con stock mínimo.</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id_producto}>
              <p>Nombre: {producto.producto_nombre}</p>
              <p>Descripción: {producto.descripcion}</p>
              <p>Stock Actual: {producto.stock_actual}</p>
              <p>Stock Mínimo: {producto.stock_minimo}</p>
              <p>Proveedor: {producto.proveedor_nombre}</p>
              <p>Contacto: {producto.contacto}</p>
              <p>Dirección: {producto.direccion}</p>
              <p>Teléfono: {producto.telefono}</p>
              <p>Email: {producto.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LowStockProducts;