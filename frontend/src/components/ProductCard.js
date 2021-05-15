import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';

const ProductCard = () => {
  return (
    <Card className='product-card'>
      <Card.Img variant='top' src='/images/buy-1.jpg' />
      <Card.Body>
        <Card.Title>Puma red shirt</Card.Title>
        <Row className='ml-1 mb-2 product-stars'>
          <ImStarFull  />
          <ImStarFull  />
          <ImStarFull  />
          <ImStarFull  />
          <ImStarEmpty />
        </Row>
        <h4>$50.23</h4>
        <Button variant='warning btn btn-block'>View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
