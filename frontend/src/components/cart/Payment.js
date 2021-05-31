import React, { Fragment, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { createOrder, clearErrors } from '../../actions/orderActions';

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
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo
  };

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice.toFixed(2);
    order.totalPrice = orderInfo.totalPrice.toFixed(2);
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100) // amount in cents
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector('#pay_btn').disabled = true;

    let res;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      res = await axios.post('/api/payment/process', paymentData, config);

      const clientSecret = res.data.client_secret;
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email
          }
        }
      });
      if (result.error) {
        alert.error(result.error.message);
        document.querySelector('#pay_btn').disabled = false;
      } else {
        // Check if the payment was processed
        if (result.paymentIntent.status === 'succeeded') {
          //New Order
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          };

          dispatch(createOrder(order));

          history.push('/success');
        } else {
          alert.error('There was an issue processing the payment');
        }
      }
    } catch (error) {
      document.querySelector('#pay_btn').disabled = false;
      alert.error(error.response.data.message);
    }
  };

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

          <Button
            className='btn btn-lg py-3 w-100 text-white'
            id='pay_btn'
            type='submit'
          >
            Pay {` - $${orderInfo && orderInfo.totalPrice.toFixed(2)}`}
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Payment;
