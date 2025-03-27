import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient instance for managing data fetching and caching
const queryClient = new QueryClient();

// App component: renders the Home and ShoppingCart components
function App() {
  return (
    <>
      {/* Render the Home component */}
      <Home />
      {/* Render the ShoppingCart component */}
      <ShoppingCart />
    </>
  );
}

// RootApp component: provides the Redux store to the App component
function RootApp() {
  return (
    // Use the Redux Provider to make the store available to all components
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// AppWithQueryClient component: provides the React Query client to the RootApp component
function AppWithQueryClient() {
  return (
    // Use the QueryClientProvider to manage data fetching and caching
    <QueryClientProvider client={queryClient}>
      <RootApp />
    </QueryClientProvider>
  );
}

export default AppWithQueryClient;
