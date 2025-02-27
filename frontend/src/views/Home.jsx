import { useContext, useEffect } from 'react';
import RolesContext from '../context/RolesContext';
import useAuth from '../hooks/useAuth';
import Footer from '../components/Footer';

const Home = () => {
  const { setCargo } = useContext(RolesContext);
  const { user } = useAuth();

  useEffect(() => {
    const userNombre = window.sessionStorage.getItem('userNombre');
    const userRol = window.sessionStorage.getItem('userRol');

    if (userNombre && userRol) {
      setCargo({ nombre: userNombre, rol: userRol });
    }
  }, [setCargo]);

  return (
    <div className='app-container'>
      <div className='home-container'>
        <h3>Conversa con nosotros</h3>
        {user ? (
          user.rol === 'CLIENTE' ? (
            <p>Bienvenido {user.nombre}</p>
          ) : (
            <p>Hola, {user.nombre}. Has iniciado sesion como: {user.rol}</p>
          )
        ) : (
          <p>Inicia sesión o registrate</p>
        )}
      </div>
      
    </div>
  );
};

export default Home;