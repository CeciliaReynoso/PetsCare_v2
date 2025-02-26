// src/views/LowStockProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import { ENDPOINT } from '../config/constans';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LowStockProducts = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.rol !== 'COMPRADOR') {
      navigate('/no-autorizado');
      return;
    }

    setLoading(false);
  }, [user, token, navigate]);

  useEffect(() => {
    if (!loading) {
      fetchProductos();
    }
  }, [loading, token]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(ENDPOINT.lowStockProducts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductos(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Reporte de Productos con Stock Mínimo</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>Proveedor</th>
            <th>Contacto</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre}</td>
              <td>{producto.stock_actual}</td>
              <td>{producto.stock_minimo}</td>
              <td>{producto.proveedor_nombre}</td>
              <td>{producto.contacto}</td>
              <td>{producto.proveedor_direccion}</td>
              <td>{producto.telefono}</td>
              <td>{producto.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockProducts;