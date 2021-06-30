import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

// cart imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

// order imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

// User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

// Admin imports
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewPorduct from './components/admin/NewPorduct';
import UpdatePorduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';

import ProtectedRoute from './components/route/ProtectedRoute';

import { loadUser } from './actions/userActions';
import store from './store';

import './App.css';
import axios from 'axios';

// Payment imports
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header />
        <ProtectedRoute
          path='/dashboard'
          isAdmin={true}
          component={Dashboard}
        />
        <ProtectedRoute
          path='/products/admin/all'
          exact
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          path='/products/admin/new'
          exact
          isAdmin={true}
          component={NewPorduct}
        />
        <ProtectedRoute
          path='/products/admin/update/:product_id'
          exact
          isAdmin={true}
          component={UpdatePorduct}
        />
        <ProtectedRoute
          path='/admin/orders'
          exact
          isAdmin={true}
          component={OrdersList}
        />
        <ProtectedRoute
          path='/orders/admin/update/:order_id'
          exact
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          path='/admin/users'
          exact
          isAdmin={true}
          component={UsersList}
        />
        <div className='content-container'>
          <Route path='/' exact component={Home} />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/products/:id' exact component={ProductDetails} />

          <Route path='/login' component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/password/forgot' exact component={ForgotPassword} />
          <Route path='/password/reset/:token' component={ResetPassword} />

          <Route path='/cart' exact component={Cart} />
          <ProtectedRoute path='/shipping' exact component={Shipping} />
          <ProtectedRoute path='/success' exact component={OrderSuccess} />
          <ProtectedRoute
            path='/order/confirm'
            exact
            component={ConfirmOrder}
          />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path='/payment' exact component={Payment} />
            </Elements>
          )}
          <ProtectedRoute path='/me/update' exact component={UpdateProfile} />
          <ProtectedRoute path='/me' exact component={Profile} />
          <ProtectedRoute path='/me/update' exact component={UpdateProfile} />
          <ProtectedRoute
            path='/password/update'
            exact
            component={UpdatePassword}
          />
          <ProtectedRoute path='/orders/me' exact component={ListOrders} />
          <ProtectedRoute
            path='/orders/me/:order_id'
            exact
            component={OrderDetails}
          />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
