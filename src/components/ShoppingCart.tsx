import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateItemQuantity, clearCart } from '../store/cartSlice';

// ShoppingCart component: displays the items in the shopping cart and allows the user to remove items, update quantities, and checkout
const ShoppingCart = () => {
  // Get the cart items from the Redux store
  const cartItems = useSelector((state: any) => state.cart.items);
  // Get the dispatch function from Redux
  const dispatch = useDispatch();
  // State variable to track whether the user has checked out
  const [checkout, setCheckout] = useState(false);

  // Function to remove an item from the cart
  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  // Function to update the quantity of an item in the cart
  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  // Function to calculate the total price of the items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to calculate the total number of items in the cart
  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to handle the checkout process
  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckout(true);
  };

  // useEffect hook to display a thank you message after the user checks out
  useEffect(() => {
    if (checkout) {
      // Set a timer to clear the checkout state after 3 seconds
      const timer = setTimeout(() => {
        setCheckout(false);
      }, 3000);

      // Clear the timer when the component unmounts or the checkout state changes
      return () => clearTimeout(timer);
    }
  }, [checkout]);

  return (
    <div>
      {/* Heading for the shopping cart */}
      <h1>Shopping Cart</h1>
      {/* Display a thank you message if the user has checked out */}
      {checkout ? (
        <p>Thank you for your purchase!</p>
      ) : cartItems.length === 0 ? (
        // Display a message if the cart is empty
        <p>Your cart is empty.</p>
      ) : (
        // Display the cart items and checkout button if the cart is not empty
        <>
          <ul>
            {/* Map over the cart items and display each item in a list */}
            {cartItems.map((item) => (
              <li key={item.id}>
                {/* Display the item image */}
                <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                {/* Display the item title, price, and quantity */}
                {item.title} - ${item.price} - Quantity: {item.quantity}
                {/* Button to remove the item from the cart */}
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                {/* Buttons to update the quantity of the item */}
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}> + </button>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}> - </button>
              </li>
            ))}
          </ul>
          {/* Display the total number of items in the cart */}
          <p>Total Items: {calculateTotalItems()}</p>
          {/* Display the total price of the items in the cart */}
          <p>Total Price: ${calculateTotal()}</p>
          {/* Button to checkout */}
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
