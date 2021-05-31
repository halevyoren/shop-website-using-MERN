import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import Home from './components/Home';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

import Login from './components/user/Login';
import Register from './components/user/Register';

import ProductDetails from './components/product/ProductDetails';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

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
        <div className='pb-5 px-5'>
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
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
