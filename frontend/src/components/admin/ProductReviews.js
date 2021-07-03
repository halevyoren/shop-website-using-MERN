import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';
import { FaTrashAlt } from 'react-icons/fa';

import Sidebar from './Sidebar';
import { Button, Col, Row, Form } from 'react-bootstrap';
import {
  getProductReviews,
  deleteReview,
  clearErrors
} from '../../actions/productActions';

import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = () => {
  const [productId, setProductId] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted } = useSelector((state) => state.review);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (productId !== '') {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      alert.success('User deleted successfully');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [alert, dispatch, error, isDeleted, productId]);

  const deleteReviewHandler = (reviewID) => {
    dispatch(deleteReview(productId, reviewID));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  // define the table to view the users
  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Review Date',
          field: 'reviewDate',
          sort: 'asc'
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc'
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc'
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions'
        }
      ],
      rows: []
    };

    reviews &&
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          reviewDate: new Date(review.createdAt).toDateString(),
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <div className='center-icons'>
              <Button
                className='btn btn-danger py-2 ml-2'
                onClick={() => {
                  deleteReviewHandler(review._id);
                }}
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
        <title>Products Reviews</title>
      </Helmet>
      <Row style={{ width: '100%' }}>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Fragment>
            <h1 className='my-5'>Products Reviews</h1>
            <Row className='justify-content-md-center mt-5'>
              <Col md={5}>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='formGroupProductID'>
                    <Form.Label>Enter Product ID</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Product ID'
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className='px-3 mb-3'
                bordered
                striped
                hover
              />
            ) : (
              <p className='mt-5 text-center'>No Reviews.</p>
            )}
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductReviews;
