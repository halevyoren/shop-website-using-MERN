import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import LoadingSpinner from '../layout/LoadingSpinner';
import { login, clearErrors } from '../../actions/userActions';
import { Button, Form } from 'react-bootstrap';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error, history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className='login-form wrapper '>
            <Form
              className='shadow-lg col-12 col-lg-7 p-4'
              onSubmit={submitHandler}
            >
              <h1>Login</h1>
              <Form.Group controlId='formGroupEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='formGroupPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <p className='forgot-password text-right mb-4'>
                <Link to='/password/forgot'>Forgot password?</Link>
              </p>
              <Button
                className='btn btn-lg py-3 w-100 text-white'
                type='submit'
              >
                LOGIN
              </Button>
              <p className='text-right mt-3'>
                <Link to='/register'>New User?</Link>
              </p>
            </Form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
