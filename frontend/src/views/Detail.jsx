// src/views/Detail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig'; // Importar la instancia de Axios configurada
import { useCart } from '../hooks/useCart';
import { ENDPOINT } from '../config/constans'; // Importar los endpoints
import '../Detail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(ENDPOINT.detail.replace(':id', id));
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detail-container">
      <img src={product.imagen_url} alt={product.nombre} className="product-image" />
      <h1>{product.nombre}</h1>
      <p>{product.descripcion}</p>
      <p><strong>Subcategoría:</strong> {product.subcategoria_descripcion}</p>
      <p><strong>Proveedor:</strong> {product.proveedor_nombre}</p>
      <button onClick={() => addToCart(product)} className="btn add-to-cart-btn">Añadir al carrito</button>
      <button onClick={() => navigate('/tienda')} className="btn back-to-store-btn">Volver a la tienda</button>
    </div>
  );
};

export default Detail;