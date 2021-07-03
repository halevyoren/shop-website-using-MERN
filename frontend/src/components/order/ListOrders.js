import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import { myOrders, clearErrors } from '../../actions/orderActions';
import LoadingSpinner from '../layout/LoadingSpinner';
import { FaEye } from 'react-icons/fa';

const ListOrdert = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
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
          label: 'Created At',
          field: 'createdAt',
          sort: 'asc'
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Num of Products',
          field: 'numOfProducts',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        }
      ],
      rows: []
    };

    orders &&
      orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          createdAt: new Date(order.createdAt).toDateString(),
          amount: `$${order.totalPrice.toFixed(2)}`,
          numOfProducts: order.orderItems.length,
          status:
            order.orderStatus &&
            String(order.orderStatus).includes('Delivered') ? (
              <p style={{ color: 'green' }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: 'red' }}>{order.orderStatus}</p>
            ),
          actions: (
            <Link
              to={`/orders/me/${order._id}`}
              style={{ textDecoration: 'none' }}
            >
              <FaEye size='1.2rem' /> &nbsp; View Order
            </Link>
          )
        });
      });

    return data;
  };

  return (
    <Fragment>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      <h1 className='my-5'>My Orders</h1>

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
  );
};

export default ListOrdert;
