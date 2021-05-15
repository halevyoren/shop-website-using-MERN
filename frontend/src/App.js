import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';

import './style.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
