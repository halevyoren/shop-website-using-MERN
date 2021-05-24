import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import { forgotPassword, clearErrors } from '../../actions/userActions';
import { Button, Form } from 'react-bootstrap';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('email', email);

    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [alert, dispatch, error, message]);

  return (
    <Fragment>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className='user-form wrapper'>
        <Form
          className='shadow-lg col-12 col-lg-7 px-4 py-5'
          onSubmit={submitHandler}
          encType='multipart/form-data'
        >
          <h1 className='mb-3'>Forgot Password</h1>
          <Form.Group controlId='formGroupOldPassword' className='mb-5'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className='mb-2'
              type='email'
              placeholder='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            className='btn btn-lg py-3 w-100 text-white'
            type='submit'
            disabled={loading ? true : false}
          >
            Send Email
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
