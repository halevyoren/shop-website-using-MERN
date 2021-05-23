import React from 'react';
import { Navbar, Button, Col, Figure, NavDropdown } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import LogoImg from '../../images/shop-logo.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

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
        <Col>
          <Route render={({ history }) => <Search history={history} />} />
        </Col>
        <Col
          md={1}
          className='d-flex align-items-center justify-content-center my-3'
        >
          {/* <div className='text-center d-flex align-items-center justify-content-center py-2'> */}
          <Link to='/cart' className='cart-link'>
            <span className='mr-1 nav_cart'>Cart</span>
            <span className='mr-3 nav_cart_item_count'>10</span>
          </Link>
        </Col>
        <Col
          md={2}
          className='d-flex align-items-center justify-content-center py-2'
        >
          {user ? (
            <Link to='/' className='dropdown d-inline'>
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
                    <Figure.Caption>
                      {user && user.name && user.name.split(' ')[0]}
                    </Figure.Caption>
                  </Figure>
                }
                className='p-0 m-auto'
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item>
                  <Link to='/me'>Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item divider />

                {user && user.role !== 'admin' ? (
                  <NavDropdown.Item>
                    <Link to='/orders/me'>Orders</Link>
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>
                    <Link to='/dashdash'>Dashdash</Link>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item divider />
                <NavDropdown.Item>
                  <Link to='/' className='text-danger'>
                    <FaSignOutAlt /> &nbsp; Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Link>
          ) : (
            !loading && (
              <Link to='/login'>
                <Button className='login-btn border-0'>Login</Button>
              </Link>
            )
          )}
          {/* </div> */}
        </Col>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
