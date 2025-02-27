import { useContext, useEffect } from 'react';
import RolesContext from '../context/RolesContext';
import useAuth from '../hooks/useAuth';

const HomePerfil = () => {
  const { user } = useAuth();
  const { cargo, setCargo } = useContext(RolesContext);

  
  useEffect((user) => {
    if (!user) {
      return;
    }
    if (user.rol !== 'COMPRADOR' && user.rol !== 'ADMINISTRADOR' && user.rol !== 'CLIENTE') {
      navigate('/');
      return;
    }
    if (user) {
      const userNombre = window.sessionStorage.getItem('userNombre');
      const userRol = window.sessionStorage.getItem('userRol');
      const userEmail = window.sessionStorage.getItem('userEmail');
      const userDireccion = window.sessionStorage.getItem('userDireccion');
      
      setCargo({ nombre: userNombre, rol: userRol, email: userEmail, direccion: userDireccion });
    }
  }, [user, setCargo]);

  return (
    <div className='home-perfil-container'>
      <div>
      <h3>Mi Perfil</h3>
      <p>Datos registrados</p>
      <p>Nombre: {user?.nombre}</p>
      <p>Rol: {user?.rol}</p>
      <p>Dirección: {user?.direccion}</p>
      <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default HomePerfil;