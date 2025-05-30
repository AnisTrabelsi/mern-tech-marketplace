import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut, ListOrdered } from 'lucide-react'; // icône pour commandes

export default function Header() {
  const { totalItems } = useContext(CartContext);
  const { user, setToken } = useContext(AuthContext);

  const handleLogout = () => setToken(null);

  return (
    <motion.header
      className="bg-white shadow py-4 px-6 flex justify-between items-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="text-xl font-bold text-purple-600 hover:text-purple-800">
        MERN Tech Marketplace
      </Link>

      <nav className="flex items-center space-x-6">
        <Link to="/products" className="hover:text-purple-700">
          Produits
        </Link>

        <Link to="/cart" className="relative hover:text-purple-700">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {user && (
          <Link to="/orders" className="flex items-center space-x-1 hover:text-purple-700">
            <ListOrdered size={16} />
            <span>Mes commandes</span>
          </Link>
        )}

        {user ? (
          <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-purple-700">
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        ) : (
          <Link to="/login" className="flex items-center space-x-1 hover:text-purple-700">
            <User size={16} />
            <span>Connexion</span>
          </Link>
        )}
      </nav>
    </motion.header>
  );
}
