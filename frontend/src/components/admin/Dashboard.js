import React, { Fragment, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { FaAngleRight } from 'react-icons/fa';

import { getAdminProducts, clearErrors } from '../../actions/productActions';
import { getAllOrders } from '../../actions/orderActions';
import { allUsers } from '../../actions/userActions';
import LoadingSpinner from '../layout/LoadingSpinner';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const {
    orders,
    totalAmount,
    loading: loadingOrders
  } = useSelector((state) => state.allOrders);

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);
  return (
    <Fragment>
      {loading || loadingOrders ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Helmet>
            <title>Dashboard</title>
          </Helmet>
          <Row style={{ width: '100%' }}>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col md={10} className='px-auto'>
              <h1 className='my-4'>Dashboard</h1>
              <Row className='pr-4'>
                <Col xl={12} sm={12} className='mb-3'>
                  <div className='card text-white bg-primary o-hidden h-100'>
                    <div className='card-body'>
                      <div className='text-center card-font-size'>
                        Total Amount
                        <br /> <b>{totalAmount && totalAmount.toFixed(2)}</b>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className='pr-4'>
                <Col className='mb-3'>
                  <div className='card text-white bg-success o-hidden h-100'>
                    <div className='card-body'>
                      <div className='text-center card-font-size'>
                        Products
                        <br /> <b>{products.length}</b>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/products'
                    >
                      <span className='float-left'>View Details</span>
                      <span className='float-right'>
                        <FaAngleRight />
                      </span>
                    </Link>
                  </div>
                </Col>

                <Col className='mb-3'>
                  <div className='card text-white bg-danger o-hidden h-100'>
                    <div className='card-body'>
                      <div className='text-center card-font-size'>
                        Orders
                        <br /> <b>{orders && orders.length}</b>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/orders'
                    >
                      <span className='float-left'>View Details</span>
                      <span className='float-right'>
                        <FaAngleRight />
                      </span>
                    </Link>
                  </div>
                </Col>

                <Col className='mb-3'>
                  <div className='card text-white bg-info o-hidden h-100'>
                    <div className='card-body'>
                      <div className='text-center card-font-size'>
                        Users
                        <br /> <b>{users && users.length}</b>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/users'
                    >
                      <span className='float-left'>View Details</span>
                      <span className='float-right'>
                        <FaAngleRight />
                      </span>
                    </Link>
                  </div>
                </Col>

                <Col className='mb-3'>
                  <div className='card text-white bg-warning o-hidden h-100'>
                    <div className='card-body'>
                      <div className='text-center card-font-size'>
                        Out of Stock
                        <br /> <b>{outOfStock}</b>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
