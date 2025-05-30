// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider }     from './contexts/AuthContext';
import { CartProvider }     from './contexts/CartContext';
import Header               from './components/Header';
import ToastProvider        from './components/ToastProvider';

import HomePage             from './pages/HomePage';
import LoginPage            from './pages/LoginPage';
import RegisterPage         from './pages/RegisterPage';
import ProductListPage      from './pages/ProductListPage';
import ProductDetailPage    from './pages/ProductDetailPage';
import ProductCreatePage    from './pages/ProductCreatePage';
import ProductEditPage      from './pages/ProductEditPage';
import CartPage             from './pages/CartPage';
import CheckoutPage         from './pages/CheckoutPage';
import OrderHistoryPage     from './pages/OrderHistoryPage';
import OrderDetailPage      from './pages/OrderDetailPage';

import PrivateRoute         from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route path="/products"    element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderHistoryPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <PrivateRoute>
                <OrderDetailPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products/new"
            element={
              <PrivateRoute>
                <ProductCreatePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products/:id/edit"
            element={
              <PrivateRoute>
                <ProductEditPage />
              </PrivateRoute>
            }
          />
        </Routes>

        <ToastProvider />
      </CartProvider>
    </AuthProvider>
  );
}
