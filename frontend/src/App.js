import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' exact component={Home} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
