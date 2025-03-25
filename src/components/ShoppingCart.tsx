import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateItemQuantity, clearCart } from '../store/cartSlice';

const ShoppingCart = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  const [checkout, setCheckout] = useState(false);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckout(true);
  };

  useEffect(() => {
    if (checkout) {
      const timer = setTimeout(() => {
        setCheckout(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [checkout]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {checkout ? (
        <p>Thank you for your purchase!</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                {item.title} - ${item.price} - Quantity: {item.quantity}
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}> + </button>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}> - </button>
              </li>
            ))}
          </ul>
          <p>Total Items: {calculateTotalItems()}</p>
          <p>Total Price: ${calculateTotal()}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
