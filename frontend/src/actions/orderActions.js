import axios from 'axios';

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS
} from '../constants/orderConstatnts';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('/api/orders/new', order, config);

    console.log(data.order);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message
    });
  }
};

// Get currently logged in user's orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_ORDERS_REQUEST
    });

    const { data } = await axios.get('/api/orders/me');

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message
    });
  }
};

// Get all orders - admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ORDERS_REQUEST
    });

    const { data } = await axios.get(`/api/orders/admin/all`);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: {orders : data.orders,totalAmount : data.totalAmount}
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message
    });
  }
};

// Get all orders details
export const getOrderDetails = (order_id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });

    const { data } = await axios.get(`/api/orders/${order_id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
