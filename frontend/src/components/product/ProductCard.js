import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { name, price, images, numberOfReviews, ratings } = product;
  return (
    <Card className='product-card m-3'>
      <Card.Img variant='top' src={images[0].url} />
      <Card.Body>
        <Card.Title>
          <Link to={`/products/${product._id}`} className='card-title'>
            {name}
          </Link>
        </Card.Title>
        <Row className='ml-1 mb-2 product-stars align-items-center'>
          <ReactStars
            count={5}
            edit={false}
            isHalf={true}
            size={20}
            value={ratings}
            activeColor='#ffd700'
            color='#ddd'
          />
          <span> &nbsp; ({numberOfReviews} Reviews)</span>
        </Row>
        <h4>
          {price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </h4>

        <Link to={`/products/${product._id}`}>
          <Button variant='warning btn btn-block' className='mt-4'>
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
