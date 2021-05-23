import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstants';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/login',
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message
    });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const { data } = await axios.post('/api/register', userData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message
    });
  }
};

// Load current user data
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_CURRENT_USER_REQUEST
    });
    const { data } = await axios.get('/api/me');

    dispatch({
      type: LOAD_CURRENT_USER_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    dispatch({
      type: LOAD_CURRENT_USER_FAIL,
      payload: error.response.data.message
    });
  }
};

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const { data } = await axios.put('/api/me/update', userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/logout');

    dispatch({
      type: LOGOUT_USER_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
