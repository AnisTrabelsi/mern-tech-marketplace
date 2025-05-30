import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { CartContext } from '../contexts/CartContext';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  if (!cart.items.length) {
    return <p className="p-6">Votre panier est vide.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Total : {cart.items
          .reduce((sum, i) => sum + i.product.price * i.qty, 0)
          .toFixed(2)} €
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
