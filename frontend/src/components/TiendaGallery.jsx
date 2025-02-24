import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'; 
import { Link, useNavigate } from 'react-router-dom';
import tiendaImage from '../../assets/tienda.png'; 
import { ENDPOINT } from '../config/constans';
  
const ProductGallery = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductosTienda = async () => {
      try {
        const response = await axios.get(`${ENDPOINT.tienda}`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos en tienda:', error);
      }
    };

    fetchProductosTienda();
  }, []);

  return ( 
      <div className="gallery-container">
        {productos.map(producto => (
          <div key={producto.id_producto} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <ProductCard product={producto} />
          </div>
        ))}
      </div>    
  );
};

export default ProductGallery;