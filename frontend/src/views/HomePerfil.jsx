import { useContext, useEffect, useState } from 'react';
import RolesContext from '../context/RolesContext';
import useAuth from '../hooks/useAuth';

const HomePerfil = () => {
  const { user } = useAuth();
  const { cargo, setCargo } = useContext(RolesContext);
  const [userNombre, setUserNombre] = useState('');
  const [userRol, setUserRol] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDireccion, setUserDireccion] = useState('');

  useEffect(() => {
    if (user) {
      const userNombre = window.sessionStorage.getItem('userNombre');
      const userRol = window.sessionStorage.getItem('userRol');
      const userEmail = window.sessionStorage.getItem('userEmail');
      const userDireccion = window.sessionStorage.getItem('userDireccion');

      setCargo({ nombre: userNombre, rol: userRol, email: userEmail, direccion: userDireccion });

      setUserNombre(userNombre);
      setUserRol(userRol);
      setUserEmail(userEmail);
      setUserDireccion(userDireccion);
    }
  }, [user, setCargo]);

  return (
    <div className='home-perfil-container'>
      <div>
        <h3>Mi Perfil</h3>
        <p>Datos registrados</p>
        <p>Nombre: {userNombre}</p>
        <p>Rol: {userRol}</p>
        <p>Dirección: {userDireccion}</p>
        <p>Email: {userEmail}</p>
      </div>
    </div>
  );
};

export default HomePerfil;