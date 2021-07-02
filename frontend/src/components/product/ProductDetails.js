import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Carousel } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import { getProductDetails, clearErrors } from '../../actions/productActions';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemToCart } from '../../actions/cartActions';
import SubmitReviewModal from '../modals/SubmitReviewModal';
import LoadingSpinner from '../layout/LoadingSpinner';

const ProductDetails = ({ match }) => {
  const [modalShow, setModalShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Review posted successfully');
      dispatch({
        type: NEW_REVIEW_RESET
      });
    }
  }, [alert, dispatch, error, match.params.id, reviewError, success]);

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity((qty) => qty + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((qty) => qty - 1);
  };

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success('Item added to cart');
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <Row className='justify-content-around product-details'>
            {/* The image of the product (on the left side) */}
            <Col className='mt-5'>
              <Carousel pause='hover'>
                {product.images &&
                  product.images.map((image) => {
                    return (
                      <Carousel.Item key={image.public_id}>
                        <img src={image.url} alt={product.title} />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </Col>

            {/* The product's details (on the right side) */}
            <Col className='mt-5 mb-5'>
              <h3>{product.name}</h3>
              <p id='product_id'>Product # {product._id}</p>

              <hr />

              {/* Product rating */}
              <div className='d-flex align-items-center'>
                <ReactStars
                  count={5}
                  edit={false}
                  isHalf={true}
                  size={30}
                  value={product.ratings || 0}
                  activeColor='#ffd700'
                  color='#ddd'
                />
                <span id='no_of_reviews'>
                  &nbsp; ({product.numberOfReviews || 0} Reviews)
                </span>
              </div>

              <hr />

              <h5 id='product_price'>${product.price}</h5>

              {/* amount of product and adding to cart */}
              <div className='stockCounter d-flex align-items-center'>
                <Button className='btn btn-danger' onClick={decreaseQuantity}>
                  -
                </Button>

                <input
                  type='number'
                  className='count ml-1'
                  value={quantity}
                  readOnly
                />

                <Button className='btn btn-primary' onClick={increaseQuantity}>
                  +
                </Button>
                <Button
                  id='cart_btn'
                  className='btn btn-primary ml-4 px-4 add-to-cart-btn'
                  disabled={product.stock === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
              </div>

              <hr />

              {/* stock status */}
              <p>
                Status:{' '}
                <span
                  id='stock_status'
                  className={`font-weight-bold ${
                    product.stock > 0 ? 'green-color' : 'red-color'
                  }`}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>

              <hr />

              <h4 className='mt-2'>Description:</h4>
              <p>
                Binge on movies and TV episo des, news, sports, music and more!
                We insisted on 720p High Definition for this 32" LED TV,
                bringing out more lifelike color, texture and detail. We also
                partnered with Roku to bring you the best possible content with
                thousands of channels to choose from, conveniently presented
                through your own custom home screen.
              </p>
              <hr />
              <p id='product_seller mb-3'>
                Sold by: <strong>Amazon</strong>
              </p>

              {user ? (
                <Button
                  className='submit-review-btn'
                  onClick={() => setModalShow(true)}
                >
                  Submit Yout Review
                </Button>
              ) : (
                <div
                  className='alert alert-danger mt-5'
                  type='alert'
                  style={{ textAlign: 'center' }}
                >
                  You must login in order to post your review.
                </div>
              )}

              <SubmitReviewModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product_id={match.params.id}
              />
            </Col>
          </Row>
          <div className='mb-5'>
            <h3>Other's Reviews:</h3>
            <hr />
            {product &&
              product.reviews &&
              product.reviews.map((review) => (
                <div key={review._id} class='review-card my-3'>
                  <p class='review-username ml-2 mb-0'>{review.name}</p>
                  <div className='ml-1'>
                    <ReactStars
                      count={5}
                      edit={false}
                      isHalf={true}
                      size={30}
                      value={review.rating || 0}
                      activeColor='#ffd700'
                      color='#ddd'
                    />
                  </div>
                  <p class='review_comment ml-3'>{review.comment}</p>

                  <hr />
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
