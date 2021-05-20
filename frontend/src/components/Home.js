import React, { Fragment, useEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Slider from 'rc-slider';
import ReactStars from 'react-rating-stars-component';

import ProductCard from './product/ProductCard';
import { getAllProducts } from '../actions/productActions';
import { Col, Row } from 'react-bootstrap';
import LoadingSpinner from './layout/LoadingSpinner';

import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  // arguments used to filter products
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [minRating, setMinRating] = useState(0);

  // argument used to show slider moving when dragged
  const [slidingPriceRange, setSlidingPriceRange] = useState([0, 1000]);

  // argument used to remember last chosen rating when
  const lastChosenRating = useRef(0);

  const categories = [
    'Electronics',
    'Camera',
    'Laptop',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ];

  const {
    loading,
    products,
    error,
    productCount,
    resPerPage,
    filteredProductsCount
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(
      getAllProducts(keyword, currentPage, priceRange, category, minRating)
    );
  }, [
    dispatch,
    error,
    alert,
    keyword,
    currentPage,
    priceRange,
    category,
    minRating
  ]);

  const setCurrentPageNum = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sliderPriceHandler = () => {
    setCurrentPage(1);
    setPriceRange(slidingPriceRange);
  };

  const categoryHandler = (category) => {
    setCurrentPage(1);
    setCategory(category);
  };

  const ratingHandler = (rating) => {
    lastChosenRating.current = rating;
    setCurrentPage(1);
    setMinRating(rating);
  };

  let numberOfProducts = productCount;
  if (keyword) {
    numberOfProducts = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='home-page mb-5'>
          <Helmet>
            <title>The best store online - Oren's Shop</title>
          </Helmet>
          <h1 className='mt-4 mb-5'>Last Products</h1>
          <Row className='justify-content-center'>
            {keyword ? (
              <Fragment>
                <Col md={3} className='mb-5 filters'>
                  <Range
                    marks={{
                      0: `$0`,
                      200: `$200`,
                      400: `$400`,
                      600: `$600`,
                      800: `$800`,
                      1000: `$1000+`
                    }}
                    min={0}
                    max={1000}
                    defaultValue={[0, 1000]}
                    step={1}
                    tipFormatter={(value) => `$${value}`}
                    tipProps={{
                      placement: 'top'
                    }}
                    value={slidingPriceRange}
                    onChange={(priceRange) => setSlidingPriceRange(priceRange)}
                    onAfterChange={sliderPriceHandler}
                  />
                  <hr className='my-5' />
                  <div className='mt-5'>
                    <h4 className='mb-3'>Categories</h4>
                    <ul className='pl-0'>
                      {categories.map((category) => (
                        <li
                          key={category}
                          onClick={() => categoryHandler(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <h4 className='mb-3'>Rating</h4>
                  <div className='d-flex align-items-center'>
                    <ReactStars
                      count={5}
                      isHalf={true}
                      size={30}
                      value={lastChosenRating.current}
                      color='#ddd'
                      onChange={ratingHandler}
                    />
                    <div className='rating-text'>&up</div>
                  </div>
                  <h5
                    className='all-ratings-text'
                    onClick={() => ratingHandler(0)}
                  >
                    All ratings
                  </h5>
                </Col>
                <Col>
                  <div className='row'>
                    {products &&
                      products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                  </div>
                </Col>
              </Fragment>
            ) : (
              products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </Row>

          {resPerPage < numberOfProducts && (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={numberOfProducts}
                onChange={setCurrentPageNum}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass='page-item'
                linkClass='page-link'
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
