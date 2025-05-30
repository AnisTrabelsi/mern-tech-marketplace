import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, updateCart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  return (
    <motion.div
      className="container mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold">Mon Panier</h2>
      {cart.items.length === 0 ? (
        <p>Votre panier est vide. <Link to="/products" className="text-purple-600">Voir les produits</Link></p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.items.map(item => (
              <li key={item.product._id} className="flex items-center space-x-4">
                <img src={item.product.imageUrl || '/placeholder.png'} alt={item.product.name}
                  className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p>{item.product.price.toFixed(2)} €</p>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={e => updateCart(item.product._id, parseInt(e.target.value, 10))}
                    className="w-16 border rounded p-1"
                  />
                </div>
                <button onClick={() => removeFromCart(item.product._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >Supprimer</button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <button onClick={clearCart}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >Vider le panier</button>
            <div className="space-x-4">
              <span className="font-bold">Total : {total.toFixed(2)} €</span>
              <button onClick={() => navigate('/checkout')}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >Commander</button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}