// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/apiService';
import { useProductsContext } from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const { products, setProducts } = useProductsContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data.products);
    };
    getProducts();
  }, [setProducts]);

  return (
    <div className="list-group">
      {products.map((product, index) => (
        <button
          key={product.id}
          className="list-group-item d-flex justify-content-between align-items-center hover-highlight"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <span>{index + 1}. {product.title}</span>
        </button>
      ))}
    </div>
  );
};

export default ProductList;
