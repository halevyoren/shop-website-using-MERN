import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

const SubmitReviewModal = (props) => {
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
        />
        <textarea
          name='review'
          id='review'
          className='form-control mt-3'
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='submit-review-btn px-4'>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmitReviewModal;
