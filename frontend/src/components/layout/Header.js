import React from 'react';
import { Navbar, Button, Col } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import LogoImg from '../../images/shop-logo.jpg';
const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand='md'
      bg='dark'
      variant='dark'
      className='p-0'
    >
      <Navbar.Brand href='/' className='logo'>
        <img src={LogoImg} alt='' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Col>
          <Route render={({ history }) => <Search history={history} />} />
        </Col>
        <Col md='2'>
          <div className='text-center d-flex align-items-center justify-content-center p-2'>
            <Link to='/login'>
              <Button className='login-btn border-0'>Login</Button>
            </Link>
            <span className='ml-3 nav_cart'>Cart</span>
            <span className='ml-1 nav_cart_item_count'>10</span>
          </div>
        </Col>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
