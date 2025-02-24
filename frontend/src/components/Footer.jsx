import React from 'react';
import { ROLES } from '../helpers/roles';

const Footer = () => {

  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <p>© 2025 PetsCare. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;