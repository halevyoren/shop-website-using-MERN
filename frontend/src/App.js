import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';

import ProtectedRoute from './components/route/ProtectedRoute';

import { loadUser } from './actions/userActions';
import store from './store';

import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='pb-5 px-5'>
          <Route path='/' exact component={Home} />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/products/:id' exact component={ProductDetails} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/password/forgot' exact component={ForgotPassword} />
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
