import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useDispatch } from 'react-redux';
import { newReview } from '../../actions/productActions';

const SubmitReviewModal = (props) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const reviewSubmitHandler = () => {
    const formData = new FormData();

    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('productId', props.product_id);

    dispatch(newReview(formData));
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Submit Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactStars
          count={5}
          isHalf={true}
          size={60}
          activeColor='#ffd700'
          color='#ddd'
          onChange={(rating) => setRating(rating)}
        />
        <textarea
          name='review'
          id='review'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='form-control mt-3'
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            reviewSubmitHandler();
          }}
          className='submit-review-btn px-4'
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmitReviewModal;
