import axios from 'axios';
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants';

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PRODUCTS_REQUEST
    });

    const { data } = await axios.get('/api/products');

    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
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
