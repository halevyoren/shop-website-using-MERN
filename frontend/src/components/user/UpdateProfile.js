import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import {
  updateProfile,
  loadUser,
  clearErrors
} from '../../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { Button, Figure, Form } from 'react-bootstrap';
import defaultAvatar from '../../images/default-avatar.jpg';

const UpdateProfile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPriview] = useState(defaultAvatar);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('avatar', avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      if (e.target.files.length === 0) {
        // no image was picked
        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPriview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPriview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('User updated successfully');
      dispatch(loadUser());

      history.push('/me');

      dispatch({
        type: UPDATE_PROFILE_RESET
      });
    }
  }, [alert, dispatch, error, history, isUpdated, user]);
  return (
    <Fragment>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className='login-form wrapper '>
        <Form
          className='shadow-lg col-12 col-lg-7 p-4'
          onSubmit={submitHandler}
          encType='multipart/form-data'
        >
          <h1 className='mb-3'>Register</h1>
          <Form.Group controlId='formGroupName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              className='mb-2'
              placeholder='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formGroupEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className='d-flex align-items-center justify-content-center'>
            <Form.Group controlId='FormGroupAvatarPreview'>
              <Form.Label>Avatar</Form.Label>
              &nbsp; &nbsp;
              <Figure>
                <Figure.Image
                  width={70}
                  height={70}
                  alt='Avatar Preview'
                  className='rounded-circle avatar m-0'
                  src={avatarPreview}
                />
              </Figure>
              &nbsp; &nbsp;
            </Form.Group>
            <Form.Group controlId='FormGroupAvatarImage'>
              <Form.File
                name='avatar'
                id='customeFile'
                accept='image/*'
                label='Choose avatar'
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <Button
            className='btn btn-lg py-3 w-100 text-white mb-3'
            type='submit'
            disabled={loading ? true : false}
          >
            Update
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
