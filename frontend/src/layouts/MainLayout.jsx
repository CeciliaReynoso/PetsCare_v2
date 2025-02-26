import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';  
import Hero from '../components/Hero';  
import RecentPosts from '../components/RecentPosts';  
import ProductGallery from '../components/ProductGallery';  
// import Footer from '../components/Footer';

const MainLayout = () => {
  return (
   
    <div className='app-container'>
    <div className='fix-container'>
      <main>
      <Navigation />
      <ProductGallery />
      {/* <Footer /> */}
        <Outlet />
      </main>
    </div>
    </div>
  );
};

export default MainLayout;