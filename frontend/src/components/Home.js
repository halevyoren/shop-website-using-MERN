import React from 'react';
import { Helmet } from 'react-helmet';

import ProductCard from './ProductCard';

const Home = () => {
  return (
    <div className='home-page mb-5'>
      <Helmet>
        <title>The best store online - Oren's Shop</title>
      </Helmet>
      <h1 className='mt-4 mb-5'>Home Page!</h1>
      <ProductCard />
    </div>
  );
};

export default Home;
