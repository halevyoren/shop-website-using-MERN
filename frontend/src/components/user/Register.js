import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { register, clearErrors } from '../../actions/userActions';
import { Button, Figure, Form } from 'react-bootstrap';
import LoadingSpinner from '../layout/LoadingSpinner';
import defaultAvatar from '../../images/default-avatar.jpg';

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPriview] = useState(defaultAvatar);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email.toLowerCase());
    formData.set('password', password);
    formData.set('avatar', avatar);

    dispatch(register(formData));
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
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      });
    }
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
            <title>Register</title>
          </Helmet>
          <div className='user-form wrapper '>
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
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group controlId='formGroupEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group controlId='formGroupPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
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
                className='btn btn-lg py-3 w-100 text-white'
                type='submit'
                disabled={loading ? true : false}
              >
                Register
              </Button>
              <p className='text-right mt-3'>
                <Link to='/login'>Already registered?</Link>
              </p>
            </Form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Register;
