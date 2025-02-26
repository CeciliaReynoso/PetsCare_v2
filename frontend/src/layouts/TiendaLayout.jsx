import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';  
import TiendaGallery from '../components/TiendaGallery';  
import Footer  from '../components/Footer';

const TiendaLayout = () => {
  return (
    <div> 
      <main className='fix-container'>
      <Navigation />
      <TiendaGallery />
        <Outlet />
      </main>
      <Footer />
      <div/>
    </div>
  );
};

export default TiendaLayout;

