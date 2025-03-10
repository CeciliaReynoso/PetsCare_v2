// src/views/SupplierOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SupplierOrders = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detallesPedidos, setDetallesPedidos] = useState([]);
  const [proveedorId, setProveedorId] = useState('');
  const [productos, setProductos] = useState([{ producto_id: '', cantidad: '', precio_unitario: '' }]);

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

  const handleInputChange = (index, event) => {
    const values = [...productos];
    values[index][event.target.name] = event.target.value;
    setProductos(values);
  };

  const handleAddProduct = () => {
    setProductos([...productos, { producto_id: '', cantidad: '', precio_unitario: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const values = [...productos];
    values.splice(index, 1);
    setProductos(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Enviando solicitud para crear pedido:', { proveedor_id: proveedorId, productos });
      const response = await axios.post(ENDPOINT.supplierOrders, {
        proveedor_id: proveedorId,
        productos,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Respuesta del servidor:', response.data);
      fetchDetallesPedidos();
      setProveedorId('');
      setProductos([{ producto_id: '', cantidad: '', precio_unitario: '' }]);
    } catch (error) {
      console.error('Error al crear pedido:', error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const fetchDetallesPedidos = async () => {
    try {
      const response = await axios.get(ENDPOINT.supplierOrders, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Detalles de pedidos obtenidos del servidor:', response.data);
      setDetallesPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener detalles de pedidos:', error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const validarRecepcionPedido = async (id_detalle_proveedor) => {
    try {
      await axios.put(`${ENDPOINT.orders.replace(':id', id_detalle_proveedor)}`, {
        estado: 'recibido',
        usuario_id: user.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDetallesPedidos();
    } catch (error) {
      console.error('Error al validar recepción del pedido:', error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const eliminarPedido = async (id_detalle_proveedor) => {
    try {
      await axios.delete(`${ENDPOINT.supplierOrders}/${id_detalle_proveedor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDetallesPedidos();
    } catch (error) {
      console.error('Error al eliminar pedido:', error.response.data.message);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchDetallesPedidos();
  }, [token]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Gestión de Pedidos a Proveedor</h1>
      <div className="form-container">
        <h2>Crear Pedido a Proveedor</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="proveedorId">ID del Proveedor</label>
          <input
            type="text"
            id="proveedorId"
            name="proveedorId"
            value={proveedorId}
            onChange={(e) => setProveedorId(e.target.value)}
            required
          />
          {productos.map((producto, index) => (
            <div key={index}>
              <label htmlFor={`producto_id_${index}`}>ID del Producto</label>
              <input
                type="text"
                id={`producto_id_${index}`}
                name="producto_id"
                value={producto.producto_id}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
              <label htmlFor={`cantidad_${index}`}>Cantidad</label>
              <input
                type="number"
                id={`cantidad_${index}`}
                name="cantidad"
                value={producto.cantidad}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
              <label htmlFor={`precio_unitario_${index}`}>Precio Unitario</label>
              <input
                type="number"
                id={`precio_unitario_${index}`}
                name="precio_unitario"
                value={producto.precio_unitario}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
              <button type="button" onClick={() => handleRemoveProduct(index)}>Eliminar producto del pedido</button>
            </div>
          ))}
          <button type="button" onClick={handleAddProduct}>Añadir producto al pedido</button>
          <button type="submit">Crear Pedido</button>
        </form>
      </div>
      <div>
        <h2>Lista de Pedidos a Proveedor</h2>
        {detallesPedidos.length === 0 ? (
          <p>No hay pedidos a proveedores.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID del Detalle</th>
                <th>ID del Pedido</th>
                <th>ID del Producto</th>
                <th>Nombre del Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>ID del Proveedor</th>
                <th>Fecha del Pedido</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detallesPedidos.map((detalle) => (
                <tr key={detalle.id_detalle_proveedor}>
                  <td>{detalle.id_detalle_proveedor}</td>
                  <td>{detalle.pedido_proveedor_id}</td>
                  <td>{detalle.producto_id}</td>
                  <td>{detalle.producto_nombre}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precio_unitario}</td>
                  <td>{detalle.subtotal}</td>
                  <td>{detalle.proveedor_id}</td>
                  <td>{detalle.fecha_pedido}</td>
                  <td>{detalle.estado}</td>
                  <td>{detalle.total}</td>
                  <td>
                    <button onClick={() => validarRecepcionPedido(detalle.id_detalle_proveedor)}>Validar Recepción</button>
                    <button onClick={() => eliminarPedido(detalle.id_detalle_proveedor)}>Eliminar Pedido</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SupplierOrders;