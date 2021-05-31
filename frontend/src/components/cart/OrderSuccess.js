import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Col, Row } from 'react-bootstrap';
import SuccessImage from '../../images/order_success.png';

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <Helmet>
        <title>Order Success</title>
      </Helmet>
      <Row className='justify-content-center align-items-center'>
        <Col className='text-center'>
          <img src={SuccessImage} alt='Order Success' width='200' />
          <h2>Your Order has been placed successfully</h2>
          <Link to='/orders/me'>Go to Orders</Link>
        </Col>
      </Row>
    </div>
  );
};
export default OrderSuccess;
