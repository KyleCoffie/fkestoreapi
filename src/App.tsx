import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Home />
      <ShoppingCart />
    </>
  );
}

function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function AppWithQueryClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootApp />
    </QueryClientProvider>
  );
}

export default AppWithQueryClient;
