import React from 'react';
import ProductCard from './ProductCard';

const Home = () => {
  return (
    <div className='container container-fluid home-page mb-4'>
      <h1 className='mt-4 mb-5'>Home Page!</h1>
      <ProductCard />
    </div>
  );
};

export default Home;
