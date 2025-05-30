import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });

  // Charger le panier à l'init
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await api.get('/cart');
        setCart(res.data);
      } catch (err) {
        console.error('Erreur chargement panier :', err);
      }
    }
    fetchCart();
  }, []);

  // Ajouter / mettre à jour quantité
  const updateCart = async (productId, qty) => {
    const res = await api.post('/cart', { productId, qty });
    setCart(res.data);
  };

  // Retirer un article
  const removeFromCart = async productId => {
    const res = await api.delete(`/cart/${productId}`);
    setCart(res.data);
  };

  // Vider le panier
  const clearCart = async () => {
    await api.delete('/cart');
    setCart({ items: [] });
  };

  // Nombre total d'articles
  const totalItems = cart.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, updateCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}