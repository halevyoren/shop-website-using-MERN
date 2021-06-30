import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';
import { Button, Form, Row, Col } from 'react-bootstrap';

import {
  updateUser,
  getUserDetails,
  clearErrors
} from '../../actions/userActions';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import Sidebar from './Sidebar';

const UpdateUser = ({ match, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  const user_id = match.params.user_id;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('role', role);

    dispatch(updateUser(user._id, formData));
  };

  useEffect(() => {
    if (user && user._id !== user_id) {
      dispatch(getUserDetails(user_id));
      console.log(1);
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('User updated successfully');
      dispatch(getUserDetails(user_id));
      history.push('/admin/users');

      dispatch({
        type: UPDATE_USER_RESET
      });
    }
  }, [alert, dispatch, error, history, isUpdated, user, user_id]);

  return (
    <Fragment>
      <Helmet>
        <title>Update User</title>
      </Helmet>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Row>
            <Col>
              <div className='user-form wrapper '>
                <Form
                  className='shadow-lg col-12 col-lg-7 mt-3 p-4'
                  onSubmit={submitHandler}
                >
                  <h1 className='mt-2 mb-5'>Update User</h1>

                  <Form.Group controlId='form-group-name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId='form-group-email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId='form-group-role'>
                    <Form.Control
                      name='role'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      as='select'
                    >
                      <option value='user'>user</option>
                      <option value='admin'>admin</option>
                    </Form.Control>
                  </Form.Group>

                  <Button
                    type='submit'
                    className='btn update-btn btn-block mt-4 mb-3'
                  >
                    Update
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UpdateUser;
