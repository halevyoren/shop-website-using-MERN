import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';
import { FaTrashAlt } from 'react-icons/fa';
import { Button, Col, Row } from 'react-bootstrap';

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (newQuantity <= stock) dispatch(addItemToCart(id, newQuantity));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity > 0) dispatch(addItemToCart(id, newQuantity));
  };

  return (
    <div className='cart'>
      {cartItems.length === 0 ? (
        <h2 className='mt-5'>Your cart is empty</h2>
      ) : (
        <Fragment>
          <Helmet>
            <title>Your Cart</title>
          </Helmet>
          <h2 className='mt-5'>
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <Row className='d-flex justify-content-between'>
            <Col xs={12} lg={8}>
              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr />

                  <div className='cart-item'>
                    <Row>
                      <Col
                        lg={{ span: 3 }}
                        sm={{ span: 4, offset: 0 }}
                        xs={{ span: 6, offset: 3 }}
                      >
                        <img
                          src={item.image}
                          alt='Laptop'
                          height='90'
                          width='115'
                        />
                      </Col>
                      <Col
                        lg={{ span: 3 }}
                        sm={{ span: 6, offset: 0 }}
                        xs={{ span: 6, offset: 3 }}
                      >
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>

                      <Col
                        lg={{ span: 2 }}
                        sm={{ span: 4, offset: 0 }}
                        xs={{ span: 6, offset: 3 }}
                        className='mt-4 mt-lg-0'
                      >
                        <p id='card_item_price'>
                          {item.price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          })}
                        </p>
                      </Col>

                      <Col
                        lg={{ span: 3 }}
                        sm={{ span: 4, offset: 0 }}
                        xs={{ span: 6, offset: 3 }}
                        className='mt-4 mt-lg-0'
                      >
                        <div className='stockCounter d-flex align-items-center'>
                          <Button
                            className='btn btn-danger decreaseQuantity'
                            onClick={() => {
                              decreaseQuantity(item.product, item.quantity);
                            }}
                          >
                            -
                          </Button>

                          <input
                            type='number'
                            className='count ml-1'
                            value={item.quantity}
                            readOnly
                          />

                          <Button
                            className='btn btn-primary increaseQuantity'
                            onClick={() => {
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              );
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </Col>

                      <Col
                        lg={{ span: 1 }}
                        sm={{ span: 4, offset: 0 }}
                        xs={{ span: 6, offset: 5 }}
                        className='mt-4 mt-lg-0'
                      >
                        <FaTrashAlt
                          color='red'
                          onClick={() => {
                            removeItemHandler(item.product);
                          }}
                        />
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
                  <span className='order-summary-values'>3 (Units)</span>
                </p>
                <p>
                  Est. total:{' '}
                  <span className='order-summary-values'>$765.56</span>
                </p>

                <hr />
                <div className='d-flex justify-content-center'>
                  <Button
                    id='checkout_btn'
                    className='btn cart-btn px-5 py-2 text-white'
                  >
                    Check out
                  </Button>
                </div>
              </div>
            </div>
          </Row>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
