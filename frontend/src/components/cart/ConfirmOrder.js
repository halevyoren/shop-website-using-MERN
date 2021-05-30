import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const numberToMoney = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  // Calculating the prders prices

  // Calculate the price of the items in cart
  const itemPrice = Number(
    cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2)
  );

  // Shipping Price
  const shippingPrice = itemPrice > 100 ? 0 : 20;

  // Tax (17%) of order (without shipping)
  const taxPrice = Number((0.17 * itemPrice).toFixed(2));

  // Final price to pay
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  const proceedToPayment = () => {
    const data = {
      itemsPrice: itemPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    history.push('/payment');
  };

  return (
    <Fragment>
      <Helmet>
        <title>Confirm Order</title>
      </Helmet>
      <CheckoutSteps shipping confirmOrder />

      <Row className='d-flex justify-content-between'>
        <Col xs={12} lg={8}>
          <h4 className='mb-3'>Shipping Info</h4>
          <p>
            <b>Name:</b>&nbsp;{user.name}
          </p>
          <p>
            <b>Phone: </b>
            {shippingInfo.phoneNumber}
          </p>
          <p className='mb-4'>
            <b>Address: </b>
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />

          <h4 className='mt-4'>Your Cat Items</h4>

          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <hr />
              <div className='cart-item my-1'>
                <Row>
                  <Col
                    lg={{ span: 3 }}
                    sm={{ span: 4, offset: 0 }}
                    xs={{ span: 6, offset: 3 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      height='90'
                      width='115'
                    />
                  </Col>
                  <Col
                    lg={{ span: 3 }}
                    sm={{ span: 6, offset: 0 }}
                    xs={{ span: 6, offset: 3 }}
                  >
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col
                    lg={{ span: 4 }}
                    sm={{ span: 4, offset: 0 }}
                    xs={{ span: 6, offset: 3 }}
                    className='mt-4 mt-lg-0'
                  >
                    <p id='card_item_price'>
                      {item.quantity} x $ {numberToMoney(item.price)} ={' '}
                      <b>{numberToMoney(item.price * item.quantity)}</b>
                    </p>
                  </Col>
                </Row>
              </div>
            </Fragment>
          ))}
          <hr />
        </Col>

        <div className='col-12 col-lg-3 my-4 mb-5'>
          <div id='order_summary'>
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{' '}
              <span className='order-summary-values'>
                {numberToMoney(itemPrice)}
              </span>
            </p>
            <p>
              Shipping Price:{' '}
              <span className='order-summary-values'>
                {numberToMoney(shippingPrice)}
              </span>
            </p>
            <p>
              Tax:{' '}
              <span className='order-summary-values'>
                {numberToMoney(taxPrice)}
              </span>
            </p>
            <hr />
            <p>
              Total:{' '}
              <span className='order-summary-values'>
                {numberToMoney(totalPrice)}
              </span>
            </p>

            <hr />
            <div className='d-flex justify-content-center'>
              <Button
                id='checkout_btn'
                className='btn cart-btn px-5 py-2 text-white'
                onClick={proceedToPayment}
              >
                Proceed To Payment
              </Button>
            </div>
          </div>
        </div>
      </Row>
    </Fragment>
  );
};

export default ConfirmOrder;
