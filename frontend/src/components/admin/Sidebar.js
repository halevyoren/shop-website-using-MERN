import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaProductHunt,
  FaClipboardList,
  FaPlusCircle,
  FaShoppingBasket,
  FaUsers
} from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Sidebar = () => {
  const [showProducts, setShowProducts] = useState(false);
  const clickProducts = () => {
    setShowProducts((prev) => !prev);
  };
  return (
    <div className='sidebar-wrapper'>
      <nav id='sidebar'>
        <ul className='list-unstyled components'>
          <li>
            <Link to='/dashboard'>
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li>
            <Link to='#!' onClick={clickProducts}>
              <FaProductHunt /> Products{' '}
              {showProducts ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </Link>
            {showProducts && (
              <ul
                className='list-unstyled sidebar-dropdown-item'
                id='productSubmenu'
              >
                <li>
                  <Link to='/products/admin/all'>
                    <FaClipboardList /> All
                  </Link>
                </li>

                <li>
                  <Link to='/admin/product'>
                    <FaPlusCircle /> Create
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to='/admin/orders'>
              <FaShoppingBasket /> Orders
            </Link>
          </li>

          <li>
            <Link to='/admin/users'>
              <FaUsers /> Users
            </Link>
          </li>

          <li>
            <Link to='/admin/reviews'>
              <FaUsers /> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
