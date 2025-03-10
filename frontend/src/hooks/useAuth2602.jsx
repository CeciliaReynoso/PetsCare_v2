import { useState, useEffect } from 'react';
import axios, { setAuthToken } from '../config/axiosConfig';
import { useEncrypt } from './useEncrypt'; // Importar el hook de encriptación
import { ENDPOINT } from '../config/constans';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { handleEncrypt, handleDecrypt } = useEncrypt(); // Usar el hook de encriptación
  
  useEffect(() => {
    const storedToken = window.sessionStorage.getItem('token');
    const encryptedEmail = window.sessionStorage.getItem('email');

    if (storedToken && encryptedEmail) {
      const email = handleDecrypt(encryptedEmail);
      setToken(storedToken);
      setAuthToken(storedToken); // Configurar el token en Axios

      axios.get(ENDPOINT.user, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params: { email }
      })
        .then(response => {
          setUser(response.data);
          window.sessionStorage.setItem('userNombre', response.data.nombre);
          window.sessionStorage.setItem('userRol', response.data.rol);
          window.sessionStorage.setItem('userDireccion', response.data.direccion);
          window.sessionStorage.setItem('userEmail', response.data.email);
          window.sessionStorage.setItem('userId', response.data.id);
        })
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error);
          window.sessionStorage.removeItem('token');
          window.sessionStorage.removeItem('email');
        });
    }
  }, []);

  const isLoading = async (email, password) => {
    try {
      const response = await axios.post(ENDPOINT.login, { email, password });
      const token = response.data.token;
      window.sessionStorage.setItem('token', token);
      window.sessionStorage.setItem('email', handleEncrypt(email));
      setToken(token);
      setAuthToken(token); // Configurar el token en Axios

      const userResponse = await axios.get(ENDPOINT.user, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email }
      });

      setUser(userResponse.data);
      window.sessionStorage.setItem('userNombre', userResponse.data.nombre);
      window.sessionStorage.setItem('userRol', userResponse.data.rol);
      window.sessionStorage.setItem('userDireccion', userResponse.data.direccion);
      window.sessionStorage.setItem('userId', response.data.id);
      return userResponse.data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      // Mostrar un mensaje si el usuario no está registrado
      if (error.response?.status === 401 || error.response?.status === 500) {
        alert('Por favor, regístrese primero antes de iniciar sesión.');
      }
      throw error;
    }
  };

  const logout = () => {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('email');
    window.sessionStorage.removeItem('userNombre');
    window.sessionStorage.removeItem('userRol');
    window.sessionStorage.removeItem('userDireccion');
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('checkoutCart'); // Eliminar el carrito de compras
    setUser(null);
    setToken(null);
    setAuthToken(null); // Eliminar el token de Axios      
    window.location.href = '/';    
  };
  
  return { user, token, isLoading, logout };
};

export default useAuth;