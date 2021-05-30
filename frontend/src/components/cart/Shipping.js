import React, { Fragment, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { countries } from 'countries-list';
import { saveShippingInfo } from '../../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const countriesList = Object.values(countries);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({ address, city, phoneNumber, postalCode, country })
    );
    history.push('/order/confirm');
  };

  return (
    <Fragment>
      <Helmet>
        <title>Shipping Info</title>
      </Helmet>
      <CheckoutSteps shipping />
      <div className='user-form wrapper '>
        <Form
          className='shadow-lg col-12 col-lg-7 p-4'
          onSubmit={submitHandler}
          encType='multipart/form-data'
        >
          <h1 className='mb-3'>Shipping Info</h1>
          <Form.Group controlId='formGroupAddress'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              className='mb-2'
              placeholder='address'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formGroupCity'>
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder='city'
              name='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formGroupPhone'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder='phone number'
              name='phoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formGroupPostalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              placeholder='postal code'
              name='postalCode'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formGroupCountry'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              placeholder='country'
              name='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              as='select'
              required
            >
              {countriesList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button className='btn btn-lg py-3 w-100 text-white' type='submit'>
            CONTINUE
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Shipping;
