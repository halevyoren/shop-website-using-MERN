import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Col, Figure, Row } from 'react-bootstrap';

import LoadingSpinner from '../layout/LoadingSpinner';

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Helmet>
            <title>Your Profile</title>
          </Helmet>
          <Row>
            <Col>
              <h2 className='mt-5 ml-5'>My Profile</h2>
              <Figure className='w-100 d-flex-column align-items-center justify-content-center'>
                <Figure.Image
                  width={250}
                  height={250}
                  className='rounded-circle img-fluid avatar center'
                  alt={user && user.name}
                  src={user && user.avatar && user.avatar.url}
                />
                <Figure.Caption>
                  <Link
                    to='/me/update'
                    id='edit_profile'
                    className='btn btn-block btn-warning text-white w-50 center my-5'
                  >
                    Edit Profile
                  </Link>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col className='my-auto'>
              <h4 className='mt-5'>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>
              {user.role !== 'admin' && (
                <Link to='/orders/me' className='btn btn-danger btn-block mt-5'>
                  My Orders
                </Link>
              )}

              <Link
                to='/password/update'
                className='btn btn-primary btn-block mt-3'
              >
                Change Password
              </Link>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
