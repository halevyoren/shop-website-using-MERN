import React, { Fragment, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

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
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, products, error, productCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getAllProducts(currentPage));
  }, [dispatch, error, alert, currentPage]);

  const setCurrentPageNum = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='home-page mb-5'>
          <Helmet>
            <title>The best store online - Oren's Shop</title>
          </Helmet>
          <h1 className='mt-4 mb-5'>Last Products</h1>
          <Row className='justify-content-center'>
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </Row>
          {resPerPage <= productCount && (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount || 1}
                onChange={setCurrentPageNum}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass='page-item'
                linkClass='page-link'
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
