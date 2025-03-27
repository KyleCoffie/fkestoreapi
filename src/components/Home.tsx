import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import './Home.css';
import StarRating from './StarRating';

// Function to fetch all products from the Fake Store API
const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  // If the response is not ok, throw an error
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Parse the response as JSON and return it
  return response.json();
};

// Function to fetch all categories from the Fake Store API
const fetchCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  // If the response is not ok, throw an error
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Parse the response as JSON and return it
  return response.json();
};

// Function to fetch products by category from the Fake Store API
const fetchProductsByCategory = async (category) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  // If the response is not ok, throw an error
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Parse the response as JSON and return it
  return response.json();
};

// Home component: displays a list of products and allows filtering by category
const Home = () => {
  // Use the useQuery hook to fetch products from the API
  const { data: products, error: productsError, isLoading: productsLoading } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  // Use the useQuery hook to fetch categories from the API
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  // State variable to store the selected category
  const [selectedCategory, setSelectedCategory] = useState('');
  // Use the useQuery hook to fetch products by category from the API
  const { data: categoryProducts, error: categoryProductsError, isLoading: categoryProductsLoading } = useQuery({
    queryKey: ['categoryProducts', selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: !!selectedCategory, // Only fetch products if a category is selected
  });
  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // If any of the data is loading, display a loading message
  if (productsLoading || categoriesLoading || categoryProductsLoading) return <div>Loading...</div>;
  // If there is an error, display an error message
  if (productsError || categoriesError || categoryProductsError) return <div>Error: {productsError?.message || categoriesError?.message || categoryProductsError?.message}</div>;

  // Determine which products to display based on whether a category is selected
  const productsToDisplay = selectedCategory ? categoryProducts : products;

  return (
    <div>
      {/* Heading for the products section */}
      <h1>Products</h1>
      {/* Select element for filtering products by category */}
      <select className="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {/* Option to display all categories */}
        <option value="">All Categories</option>
        {/* Map over the categories and create an option for each one */}
        {categories?.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      {/* Container for the products */}
      <div className="products-container">
        {/* Map over the products to display and create a product card for each one */}
        {productsToDisplay?.map((product) => (
          <div key={product.id} className="product-card">
            {/* Display the product image */}
            <img src={product.image} alt={product.title} className="product-image" />
            {/* Display the product title */}
            <h3>{product.title}</h3>
            {/* Display the product price */}
            <p>Price: ${product.price}</p>
            {/* Display the product category */}
            <p>Category: {product.category}</p>
            {/* Display the product description */}
            <p>{product.description}</p>
            {/* Display the star rating for the product */}
            <StarRating rating={product.rating?.rate || 0} />
            {/* Button to add the product to the cart */}
            <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
