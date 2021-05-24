import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import { resetPassword, clearErrors } from '../../actions/userActions';
import { CLEAR_ERRORS } from '../../constants/userConstants';
import { Button, Form } from 'react-bootstrap';

const ResetPassword = ({ history, match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('confirmPassword', confirmPassword);
    formData.set('password', password);

    //the token is the password reset token (for the url) not the authentication toke (for logging in)
    dispatch(resetPassword(match.params.token, formData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Password updated successfully');

      history.push('/login');

      dispatch({
        type: CLEAR_ERRORS
      });
    }
  }, [alert, dispatch, error, history, success]);
  return (
    <Fragment>
      <Helmet>
        <title>New Password</title>
      </Helmet>
      <div className='user-form wrapper'>
        <Form
          className='shadow-lg col-12 col-lg-7 px-4 py-5'
          onSubmit={submitHandler}
          encType='multipart/form-data'
        >
          <h1 className='mb-3'>New Password</h1>

          <Form.Group controlId='formGroupPassword'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='new password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formGroupConfirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className='mb-2'
              type='password'
              placeholder='confirm password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className='btn btn-lg py-3 w-100 text-white mb-3'
            type='submit'
          >
            Set Password
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
