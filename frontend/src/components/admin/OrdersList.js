import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';
import { FaTrashAlt, FaEye } from 'react-icons/fa';

import LoadingSpinner from '../layout/LoadingSpinner';
import Sidebar from './Sidebar';
import { getAllOrders, clearErrors } from '../../actions/orderActions';
import { Button, Col, Row } from 'react-bootstrap';
// import {  } from '../../constants/orderConstatnts';

const OrdersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (isDeleted) {
    //   alert.success('Product deleted successfully');
    //   history.push('/products/admin/all');
    //   dispatch({ type: DELETE_PRODUCT_RESET });
    // }
  }, [alert, dispatch, error]);

  // define the table to view the orders
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: "No' of Items",
          field: 'numOfItems',
          sort: 'asc'
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions'
        }
      ],
      rows: []
    };

    orders &&
      orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          numOfItems: order.orderItems.length,
          amount: `$${order.totalPrice.toFixed(2)}`,
          status:
            order.orderStatus &&
            String(order.orderStatus).includes('Delivered') ? (
              <p style={{ color: 'green' }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: 'red' }}>{order.orderStatus}</p>
            ),
          actions: (
            <div className='center-icons'>
              <Link
                to={`/orders/admin/update/${order._id}`}
                className='py-2 btn btn-primary'
                style={{ textDecoration: 'none' }}
              >
                <FaEye size='1.2rem' />
              </Link>
              <Button className='btn btn-danger py-2 ml-2'>
                <FaTrashAlt size='1.2rem' />
              </Button>
            </div>
          )
        });
      });

    return data;
  };

  return (
    <Fragment>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Fragment>
            <h1 className='my-5'>All Orders</h1>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className='px-3 mb-3'
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrdersList;
