import axios from 'axios';
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants';

// Get all products
export const getAllProducts = (
  keyword = '',
  currentPage = 1,
  priceRange,
  category,
  minRating = 0
) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PRODUCTS_REQUEST
    });
    // if max price is 1000$ then show all prices above 1000$ as well
    const maxPrice = priceRange[1] < 1000 ? `&price[lte]=${priceRange[1]}` : '';

    // if there are chosen categorys the show only them
    const categoryFilter = category ? `&category=${category}` : '';

    const link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}${maxPrice}${categoryFilter}&ratings[gte]=${minRating}`;

    const { data } = await axios.get(link);

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

//Get Product details
export const getProductDetails = (product_id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });

    const { data } = await axios.get(`/api/products/${product_id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
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
