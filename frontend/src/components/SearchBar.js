// src/components/SearchBar.js
import React, { useState } from 'react';
import { searchProducts } from '../services/apiService';
import { useProducts } from '../context/ProductsContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setProducts } = useProducts();

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await searchProducts(query);
    setProducts(response.data.products);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
