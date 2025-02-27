import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RolesContext from '../context/RolesContext';
import useAuth from '../hooks/useAuth';

const HomePerfil = () => {
  const { user } = useAuth();
  const { cargo, setCargo } = useContext(RolesContext);
  const navigate = useNavigate();
  const [userNombre, setUserNombre] = useState('');
  const [userRol, setUserRol] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDireccion, setUserDireccion] = useState('');

  useEffect(() => {
    // // if (!user) {
    // //   return;
    // // }
    // if (user.rol !== 'COMPRADOR' && user.rol !== 'ADMINISTRADOR' && user.rol !== 'CLIENTE') {
    //   navigate('/no-autorizado');
    //   return;
    // }
    if (user) {
      const userNombre = localStorage.getItem('userNombre');
      const userRol = localStorage.getItem('userRol');
      const userEmail = localStorage.getItem('userEmail');
      const userDireccion = localStorage.getItem('userDireccion');

      setCargo({ nombre: userNombre, rol: userRol, email: userEmail, direccion: userDireccion });

      setUserNombre(userNombre);
      setUserRol(userRol);
      setUserEmail(userEmail);
      setUserDireccion(userDireccion);
    }
  }, [user, setCargo, navigate]);

  if (!user) {
    return <p>Inicie sesión</p>;
  }

  return (
    <div className='home-perfil-container'>
      <h3>Mi Perfil</h3>
      <p>Datos registrados</p>
      <p>Nombre: {userNombre}</p>
      <p>Rol: {userRol}</p>
      <p>Dirección: {userDireccion}</p>
      <p>Email: {userEmail}</p>
    </div>
  );
};

export default HomePerfil;