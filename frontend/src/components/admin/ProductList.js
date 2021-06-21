import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Helmet } from 'react-helmet';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import LoadingSpinner from '../layout/LoadingSpinner';
import Sidebar from './Sidebar';
import {
  getAdminProducts,
  clearErrors,
  deleteProduct
} from '../../actions/productActions';
import { Button, Col, Row } from 'react-bootstrap';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { errors: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product deleted successfully');
      history.push('/products/admin/all');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [alert, deleteError, dispatch, error, history, isDeleted]);

  const deleteProductHandler = (product_id) => {
    dispatch(deleteProduct(product_id));
  };

  // define the table to view the orders
  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc'
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions'
        }
      ],
      rows: []
    };

    products &&
      products.forEach((product) => {
        data.rows.push({
          id: product._id,
          name: product.name,
          price: `$${product.price}`,
          stock: product.stock,
          actions: (
            <div className='center-icons'>
              <Link
                to={`/products/admin/update/${product._id}`}
                className='py-2 btn btn-primary'
                style={{ textDecoration: 'none' }}
              >
                <FaPencilAlt size='1.2rem' />
              </Link>
              <Button
                className='btn btn-danger py-2 ml-2'
                onClick={() => deleteProductHandler(product._id)}
              >
                <FaTrashAlt size='1.2rem' />
              </Button>
            </div>
          )
        });
      });

    return data;
  };
  return (
    <Fragment>
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Fragment>
            <h1 className='my-5'>All products</h1>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className='px-3 mb-3'
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductList;
