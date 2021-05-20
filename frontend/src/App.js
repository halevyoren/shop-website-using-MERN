import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='m-5'>
          <Route path='/' exact component={Home} />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/products/:id' exact component={ProductDetails} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
