import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import { getOrderDetails, clearErrors } from '../../actions/orderActions';
import LoadingSpinner from '../layout/LoadingSpinner';

const OrderDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus
  } = order || '';

  useEffect(() => {
    dispatch(getOrderDetails(match.params.order_id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error, match.params.order_id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.Address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid = paymentInfo && paymentInfo.status === 'succeeded';

  return (
    <Fragment>
      <Helmet>
        <title>Order Details</title>
      </Helmet>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Row className='justify-content-between'>
            <Col className='order-details-personal-info'>
              <h1 className='mb-5 order-details-order-number'>
                Order # {order && order._id}
              </h1>
              <h3>
                Order Date: {order && new Date(order.createdAt).toDateString()}
              </h3>
              <hr />
              <h4 className='mb-4'>Shipping info</h4>
              <p>
                <b>name:</b> {user && user.name}
              </p>
              <p>
                <b>phone:</b> {shippingInfo && shippingInfo.phoneNumber}
              </p>
              <p className='mb-4'>
                <b>Address:</b> {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice && totalPrice.toFixed(2)}
              </p>

              <hr />

              <h4 className='my-4'> Payment</h4>
              <p className={isPaid ? 'green-color' : 'red-color'}>
                <b>{isPaid ? 'Paid' : 'Not Paid'}</b>
              </p>

              <h4 className='my-4'> Order Status:</h4>
              <p
                className={
                  String(order && order.orderStatus).includes('Delivered')
                    ? 'green-color'
                    : 'red-color'
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className='my-4'>Order Items:</h4>

              <hr />

              <div className='cart-item my-1'>
                {orderItems &&
                  orderItems.map((item) => (
                    <Fragment key={item.product}>
                      <Row className='my-5'>
                        <Col>
                          <img
                            src={item.image}
                            alt={item.name}
                            height='90'
                            width='90'
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          <p>${item.price}</p>
                        </Col>
                        <Col>
                          <p>{item.quantity} Piece(s)</p>
                        </Col>
                      </Row>
                      <hr />
                    </Fragment>
                  ))}
              </div>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
