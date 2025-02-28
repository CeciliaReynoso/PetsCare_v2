import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: '', password: '' };

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const { isLoading } = useAuth();

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = async (event) => {
    event.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y password obligatorias.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!');
    }

    try {
      const loggedInUser = await isLoading(user.email, user.password);
      window.alert('Usuario identificado con éxito 😀.');
      setUser(initialForm); // Restablecer el formulario

      // Navegar según el rol del usuario
      if (loggedInUser.role === 'ADMINISTRADOR') {
        navigate('/admin'); // Navegar a la vista Admin para Administradores
      } else {
        navigate('/'); // Navegar a la página de inicio para otros usuarios
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Mostrar un mensaje si el usuario no está registrado
      if (error.response?.status === 401 || error.response?.status === 500) {
        console.log('Usuario no registrado. Por favor, regístrese.');
      } else {
        console.log(`${error.response?.data?.message || error.message} 🙁.`);
      }
    }
  };

  return (
    <div className='fix-container'>
    <Navigation />
    <div className='recent-posts'>      
        <Link to="/tienda" className="tienda-link">
        <img src="/tienda.png" alt="Tienda" className="tienda-icon" /><span>Pulsa aquí para ver más productos</span>
        </Link>
    </div>
    <form onSubmit={handleForm} className='form-container'>
      <h1 className='form-title'>Iniciar Sesión</h1>
      <hr />
      <div className='form-group'>
        <label>Email address</label>
        <input
          placeholder='Ingrese su email'
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          placeholder='Ingrese su contraseña'
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
        />
      </div>
      <button type='submit' className='btn btn-light mt-3'>Iniciar Sesión</button>
    </form>
    <Footer />
    </div>
  );
};

export default Login;