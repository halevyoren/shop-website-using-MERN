import React from 'react';
import { Navbar, Button, Col, Figure, NavDropdown } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import LogoImg from '../../images/shop-logo.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../actions/userActions';

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged outsuccessfully.');
  };

  return (
    <Navbar
      collapseOnSelect
      expand='md'
      bg='dark'
      variant='dark'
      className='navbar p-0'
    >
      <Navbar.Brand href='/' className='logo'>
        <img src={LogoImg} alt='' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Col md={9}>
          <Route render={({ history }) => <Search history={history} />} />
        </Col>
        <Col
          md={1}
          className='d-flex align-items-center justify-content-center my-3'
        >
          <Link to='/cart' className='cart-link'>
            <span className='mr-1 nav_cart'>Cart</span>
            <span className='mr-3 nav_cart_item_count'>{cartItems.length}</span>
          </Link>
        </Col>
        <Col
          md={1}
          className='d-flex align-items-center justify-content-center py-2 px-0'
        >
          {user ? (
            <NavDropdown
              title={
                <Figure className='d-flex align-items-center'>
                  <Figure.Image
                    width={50}
                    height={50}
                    className='rounded-circle avatar m-0'
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                  />
                  &nbsp; &nbsp;
                  <Figure.Caption
                    className='text-white'
                    style={{ fontSize: '1.2rem' }}
                  >
                    {user && user.name && user.name.split(' ')[0]}
                  </Figure.Caption>
                </Figure>
              }
              className='p-0 m-auto'
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item as={Link} to='/me'>
                Profile
              </NavDropdown.Item>

              {user && user.role !== 'admin' && (
                <NavDropdown.Item as={Link} to='/dashdash'>
                  Dashdash
                </NavDropdown.Item>
              )}
              <NavDropdown.Item as={Link} to='/orders/me'>
                Orders
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to='/'
                className='text-danger'
                onClick={logoutHandler}
              >
                <FaSignOutAlt /> &nbsp; Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            !loading && (
              <Col>
                <Link to='/login'>
                  <Button className='login-btn border-0 pr-2'>Login</Button>
                </Link>
              </Col>
            )
          )}
        </Col>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
