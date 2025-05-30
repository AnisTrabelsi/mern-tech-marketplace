// src/components/CheckoutForm.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CartContext } from '../contexts/CartContext';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Calcule le montant total en cents
  const amount = cart.items.reduce(
    (sum, i) => sum + i.product.price * i.qty,
    0
  );
  const amountCents = Math.round(amount * 100);

  // À l’init, on appelle notre endpoint pour créer le PaymentIntent
  useEffect(() => {
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amountCents })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(() => setError('Impossible de démarrer le paiement'));
  }, [amountCents]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      clearCart();
      // On redirige vers la page de confirmation de commande
      window.location.href = `/orders/${paymentIntent.id}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        {processing ? 'Traitement…' : `Payer ${amount.toFixed(2)} €`}
      </button>
    </form>
  );
}
