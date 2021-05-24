import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import { updatePassword, clearErrors } from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { Button, Form } from 'react-bootstrap';

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('password', newPassword);

    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Pasword updated successfully');

      history.push('/me');

      dispatch({
        type: UPDATE_PASSWORD_RESET
      });
    }
  }, [alert, dispatch, error, history, isUpdated, user]);
  return (
    <Fragment>
      <Helmet>
        <title>Update Password</title>
      </Helmet>
      <div className='user-form wrapper'>
        <Form
          className='shadow-lg col-12 col-lg-7 px-4 py-5'
          onSubmit={submitHandler}
          encType='multipart/form-data'
        >
          <h1 className='mb-3'>Update Password</h1>
          <Form.Group controlId='formGroupOldPassword'>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              className='mb-2'
              type='password'
              placeholder='old password'
              name='oldPassword'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formGroupNewPassword'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='new password'
              name='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className='btn btn-lg py-3 w-100 text-white mb-3'
            type='submit'
            disabled={loading ? true : false}
          >
            Update Password
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
