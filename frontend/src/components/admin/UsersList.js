import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

import LoadingSpinner from '../layout/LoadingSpinner';
import Sidebar from './Sidebar';
import { Button, Col, Row } from 'react-bootstrap';
import { allUsers, clearErrors } from '../../actions/userActions';

const UsersList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  //   const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (isDeleted) {
    //   alert.success('Order deleted successfully');
    //   history.push('/admin/orders');
    //   dispatch({ type: DELETE_ORDER_RESET });
    // }
  }, [alert, dispatch, error, history]);

  //   const deleteOrderHandler = (order_id) => {
  //     dispatch(deleteOrder(order_id));
  //   };

  // define the table to view the users
  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc'
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions'
        }
      ],
      rows: []
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <div className='center-icons'>
              <Link
                to={`/admin/user/${user._id}`}
                className='py-2 btn btn-primary'
                style={{ textDecoration: 'none' }}
              >
                <FaPencilAlt size='1.2rem' />
              </Link>
              <Button
                className='btn btn-danger py-2 ml-2'
                // onClick={() => {
                //   deleteUserHandler(user._id);
                // }}
              >
                <FaTrashAlt size='1.2rem' />
              </Button>
            </div>
          )
        });
      });

    return data;
  };

  return (
    <Fragment>
      <Helmet>
        <title>All Users</title>
      </Helmet>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Fragment>
            <h1 className='my-5'>All Orders</h1>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className='px-3 mb-3'
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UsersList;
