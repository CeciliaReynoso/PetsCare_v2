import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { roles } from '../helpers/roles';
import { useCart } from '../hooks/useCart';
import '../Navbar.css';

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
  };

    // Función para formatear el precio en soles peruanos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price);
  };

  // Calcular el total en soles del carrito
  const totalEnSoles = cart.reduce((total, product) => {
    const precio = parseFloat(product.precio_venta);
    const cantidad = parseInt(product.quantity, 10);
    return total + (isNaN(precio) || isNaN(cantidad) ? 0 : precio * cantidad);
  }, 0);

  const renderButtons = () => {
    if (user) {
      if (user.rol === roles.CLIENTE) {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/tienda')} className='btn home-btn'>Tienda</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Logout</button>
            <div className='cart-container' onClick={() => navigate('/cart')}>
              <img src='/carrito.png' alt='Carrito de compras' className='cart-icon' /> Total: {formatPrice(totalEnSoles)}
            </div>
          </>
        );
      }
      if (user.rol === roles.ADMINISTRADOR) {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn nav-btn'>Inicio</button>
            <button onClick={() => navigate('/admin')} className='btn home-btn nav-btn'>Administrador</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn nav-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn nav-btn'>Logout</button>
          </>
        );
      }
      if (user.rol === roles.COMPRADOR) {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn nav-btn'>Inicio</button>
            <button onClick={() => navigate('/buyer')} className='btn home-btn nav-btn'>Comprador</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn nav-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn nav-btn'>Logout</button>
          </>
        );
      }
      if (user.rol === roles.VENDEDOR) {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn nav-btn'>Inicio</button>
            <button onClick={() => navigate('/seller')} className='btn home-btn nav-btn'>Vendedor</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn nav-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn nav-btn'>Logout</button>
          </>
        );
      }
    } else {
      return (
        <>
          <button onClick={() => navigate('/login')} className='btn login-btn nav-btn'>Iniciar sesión</button>
          <button onClick={() => navigate('/register')} className='btn register-btn nav-btn'>Registrarse</button>
          <div className='cart-container' onClick={() => navigate('/cart')}>
            <img src="/carrito.png" alt='Carrito de compras' className='cart-icon' />
          </div>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/pcsl.png" alt="logo" className="logo" />
        <img src="/brand1.png" alt="brand1" className="brand hide-on-mobile"/>
        <img src="/brand2.png" alt="brand2" className="brand2 hide-on-mobile"/>
        <img src="/brand3.png" alt="brand3" className="brand hide-on-mobile"/>
        <img src="/brand4.png" alt="brand4" className="brand hide-on-mobile"/>
        <img src="/paws.png" alt="paws" className="paws hide-on-mobile"/>
      </div>
      <div className="opciones">
        {renderButtons()}
      </div>
    </nav>
  );
};

export default Navigation;
