import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import ProductCard from './product/ProductCard';
import { getAllProducts } from '../actions/productActions';
import { Row } from 'react-bootstrap';
import LoadingSpinner from './layout/LoadingSpinner';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getAllProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='home-page mb-5'>
          <Helmet>
            <title>The best store online - Oren's Shop</title>
          </Helmet>
          <h1 className='mt-4 mb-5'>Home Page!</h1>
          <Row className='justify-content-center'>
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
