import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import './Home.css';
import StarRating from './StarRating';

const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchProductsByCategory = async (category) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Home = () => {
  const { data: products, error: productsError, isLoading: productsLoading } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: categoryProducts, error: categoryProductsError, isLoading: categoryProductsLoading } = useQuery({
    queryKey: ['categoryProducts', selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: !!selectedCategory,
  });
  const dispatch = useDispatch();

  if (productsLoading || categoriesLoading || categoryProductsLoading) return <div>Loading...</div>;
  if (productsError || categoriesError || categoryProductsError) return <div>Error: {productsError?.message || categoriesError?.message || categoryProductsError?.message}</div>;

  const productsToDisplay = selectedCategory ? categoryProducts : products;

  return (
    <div>
      <h1>Products</h1>
      <select className="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <div className="products-container">
        {productsToDisplay?.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
            <StarRating rating={product.rating?.rate || 0} />
            <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
