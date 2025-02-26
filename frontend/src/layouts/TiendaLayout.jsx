import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';  
import TiendaGallery from '../components/TiendaGallery';  
import Footer  from '../components/Footer';

const TiendaLayout = () => {
  return (
    <section className='fix-container'> 
      <main >
        <Navigation />
        <TiendaGallery />           
        <Outlet />
      </main>
      <Footer />
      <div/>
    </section>
  );
};

export default TiendaLayout;

