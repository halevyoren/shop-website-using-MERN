import React, { Fragment, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Carousel } from 'react-bootstrap';
import { getProductDetails, clearErrors } from '../../actions/productActions';
import SubmitReviewModal from '../modals/SubmitReviewModal';
import LoadingSpinner from '../layout/LoadingSpinner';
import { Helmet } from 'react-helmet';

const ProductDetails = ({ match }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Row className='justify-content-around product-details'>
          {/* The image of the product (on the left side) */}
          <Col className='mt-5'>
            <Carousel pause='hover'>
              {product.images &&
                product.images.map((image) => {
                  return (
                    <Carousel.Item key={image.public_id}>
                      <img
                        src={image.url}
                        alt={product.title}
                      />
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
              <Button className='btn btn-danger'>-</Button>

              <input type='number' value='1' readOnly />

              <Button className='btn btn-primary'>+</Button>
              <Button
                id='cart_btn'
                className='btn btn-primary ml-4 px-4 add-to-cart-btn'
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
              Binge on movies and TV episo des, news, sports, music and more! We
              insisted on 720p High Definition for this 32" LED TV, bringing out
              more lifelike color, texture and detail. We also partnered with
              Roku to bring you the best possible content with thousands of
              channels to choose from, conveniently presented through your own
              custom home screen.
            </p>
            <hr />
            <p id='product_seller mb-3'>
              Sold by: <strong>Amazon</strong>
            </p>

            <Button
              className='submit-review-btn'
              onClick={() => setModalShow(true)}
            >
              Submit Yout Review
            </Button>

            <SubmitReviewModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default ProductDetails;
