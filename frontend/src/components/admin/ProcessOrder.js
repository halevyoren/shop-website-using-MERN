import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import LoadingSpinner from '../layout/LoadingSpinner';
import Sidebar from './Sidebar';
import {
  getOrderDetails,
  updateOrder,
  clearErrors
} from '../../actions/orderActions';
import { Col, Row, Form } from 'react-bootstrap';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstatnts';

const ProcessOrder = ({ match, history }) => {
  const [status, setStatus] = useState('Processing');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus
  } = order;

  const { error, isUpdated } = useSelector((state) => state.order);

  const order_id = match.params.order_id;

  useEffect(() => {
    dispatch(getOrderDetails(order_id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Order updated successfully');
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [alert, dispatch, error, history, isUpdated, order_id]);

  const updateOrderHandler = (order_id) => {
    const formData = new FormData();
    formData.set('orderStatus', status);

    dispatch(updateOrder(order_id, formData));
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === 'succceeded' ? true : false;

  return (
    <Fragment>
      <Helmet>
        <title>Process Order # {order_id}</title>
      </Helmet>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Fragment>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Row>
                <Col lg={7} md={12} className='order-details'>
                  <h2 className='my-5'>Order # {order_id}</h2>
                  <h3 className='mb-4'>
                    Order Date:{' '}
                    {order && new Date(order.createdAt).toDateString()}
                  </h3>

                  <h4 className='mb-4'>Shipping Info</h4>
                  <p>
                    <b>Name: </b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone: </b> {shippingInfo && shippingInfo.phoneNumber}
                  </p>
                  <p className='mb-4'>
                    <b>Address: </b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Amount: </b> ${totalPrice && totalPrice.toFixed(2)}
                  </p>

                  <hr />

                  <h4 className='my-4'> Payment</h4>
                  <p className={isPaid ? 'green-color' : 'red-color'}>
                    <b>{isPaid ? 'Paid' : 'Not Paid'}</b>
                  </p>

                  <h4 className='my-4'> Stripe ID</h4>
                  <p>
                    <b>{paymentInfo && paymentInfo.id}</b>
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
                  <hr />
                </Col>

                <div className='col-12 col-lg-3 mt-5'>
                  <h4 className='my-4'>Status</h4>

                  {/* <div className='form-group'>
                    <select
                      className='form-control'
                      name='status'
                      value='status'
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value='Processing'>Processing</option>
                      <option value='Shipped'>Shipped</option>
                      <option value='Delivered'>Delivered</option>
                    </select>
                  </div> */}
                  <Form>
                    <Form.Group controlId='formGroupCountry'>
                      <Form.Control
                        name='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        as='select'
                        required
                      >
                        <option value='Processing'>Processing</option>
                        <option value='Shipped'>Shipped</option>
                        <option value='Delivered'>Delivered</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  <button
                    className='btn btn-primary btn-block'
                    onClick={() => updateOrderHandler(order._id)}
                  >
                    Update Status
                  </button>
                </div>
              </Row>
            )}
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProcessOrder;
