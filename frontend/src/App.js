import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductsProvider } from './context/ProductsContext'; // Adjust the import path as necessary
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';
import NotFoundPage from './components/NotFoundPage';
import HomePage from './components/HomePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <Router>
          <div>
            {/* Navigation Links */}
            <nav className="navbar navbar-expand navbar-light full-width">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav nav-full-width">
                    <li className="nav-item">
                      <Link className="nav-link" to="/" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Home">
                        <FontAwesomeIcon icon={faHome} />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/products" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Product List">
                        <FontAwesomeIcon icon={faList} />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/product/add" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add Product">
                        <FontAwesomeIcon icon={faPlus} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>


            {/* Routes for different pages */}
            <div className="container mt-3">
              <Routes>
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/product/add" element={<ProductForm />} />
                <Route path="/product/edit/:productId" element={<ProductForm />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ProductsProvider>
    </div>
  );
}

export default App;
