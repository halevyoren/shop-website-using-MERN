import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';

import Sidebar from './Sidebar';
import { newProduct, clearErrors } from '../../actions/productActions';
import { Button, Col, Form, Row } from 'react-bootstrap';

const NewPorduct = ({ history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push('/products/admin/all');
      alert.success('Product created successfully');
      dispatch({ type: 'NEW_PRODUCT_RESET' });
    }
  }, [alert, dispatch, error, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('stock', stock);
    formData.set('seller', seller);

    images.forEach((image) => {
      formData.append('images', image);
    });
    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    // the files of the images for the new product
    const files = Array.from(e.target.files);

    // Clearing images arrays before adding/re-adding them
    setImagesPreview([]);
    setImages([]);

    if (e.target.files.length === 0) {
      // no image was picked
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <Helmet>
        <title>New Product</title>
      </Helmet>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Fragment>
            <div className='user-form wrapper '>
              <Form
                className='shadow-lg col-12 col-lg-7 p-4'
                onSubmit={submitHandler}
                encType='multipart/form-data'
              >
                <h1 className='mb-3'>New Product</h1>
                <Form.Group controlId='formGroupName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className='mb-2'
                    placeholder='name'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formGroupPrice'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    placeholder='price'
                    name='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formGroupDescription'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    placeholder='description'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formGroupCategory'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as='select'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {' '}
                        {category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='formGroupStock'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    placeholder='stock'
                    name='stock'
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formGroupSellerName'>
                  <Form.Label>Seller Name</Form.Label>
                  <Form.Control
                    placeholder='seller'
                    name='seller'
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formGroupImages'>
                  <Form.Label>Images</Form.Label>
                  <Form.File
                    type='file'
                    className='custom-file-label'
                    label='Images'
                    multiple
                    custom
                    onChange={onChange}
                  />
                </Form.Group>

                {/* <div className='d-flex align-items-center justify-content-center'> */}
                {imagesPreview.map((image) => (
                  <img
                    src={image}
                    key={image}
                    alt='Images Preview'
                    className='mb-4 mr-1'
                    width='55'
                    height='55'
                  />
                ))}
                {/* </div> */}
                <Button
                  className='btn btn-lg py-3 w-100 text-white'
                  type='submit'
                  disabled={loading ? true : false}
                >
                  CREATE PRODUCT
                </Button>
                <p className='text-right mt-3'></p>
              </Form>
            </div>
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NewPorduct;
