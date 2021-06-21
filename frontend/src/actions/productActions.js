import axios from 'axios';
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants';

// Get all products
export const getAllProducts =
  (keyword = '', currentPage = 1, priceRange, category, minRating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_PRODUCTS_REQUEST
      });
      // if max price is 1000$ then show all prices above 1000$ as well
      const maxPrice =
        priceRange[1] < 1000 ? `&price[lte]=${priceRange[1]}` : '';

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

// Creat new Product - admin
export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/products/admin/new',
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message
    });
  }
};

// Update Product - admin
export const updateProduct = (product_id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.put(
      `/api/products/admin/${product_id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message
    });
  }
};

// Delete Product - admin
export const deleteProduct = (product_id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST
    });

    const { data } = await axios.delete(`/api/products/admin/${product_id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
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

//Get Product details
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.put(
      '/api/products/review',
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message
    });
  }
};

//Get Product details
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCTS_REQUEST
    });

    const { data } = await axios.get(`/api/products/admin/all`);

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
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
