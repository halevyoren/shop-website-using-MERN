import React, { Fragment, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { useAlert } from 'react-alert';
import axios from 'axios';

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';

// options for form elements
const options = {
  style: {
    base: { fontSize: '16px' },
    invalid: { color: 'red' }
  }
};

const Payment = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {}, []);

  const submitHandler = () => {};

  return (
    <Fragment>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <CheckoutSteps shipping confirmOrder payment />
      <div className='user-form wrapper '>
        <Form
          className='shadow-lg col-12 col-lg-7 p-4'
          onSubmit={submitHandler}
          encType='multipart/form-data'
        >
          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              as={CardNumberElement}
              name='cardNumber'
              required
              options={options}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Card Experation</Form.Label>
            <Form.Control
              as={CardExpiryElement}
              name='cardExperation'
              required
              options={options}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Card CVC</Form.Label>
            <Form.Control
              as={CardCvcElement}
              name='cardCVC'
              required
              options={options}
            />
          </Form.Group>

          <Button className='btn btn-lg py-3 w-100 text-white' type='submit'>
            Pay
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Payment;
