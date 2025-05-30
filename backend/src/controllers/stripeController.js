// src/controllers/stripeController.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/stripe/create-payment-intent
 * { amount: number } en cents
 */
export async function createPaymentIntent(req, res) {
  try {
    const { amount } = req.body;
    // Crée un PaymentIntent avec le montant et la monnaie
    const pi = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });
    // Renvoie uniquement le client_secret au frontend
    res.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error('Stripe createPaymentIntent error:', err);
    res.status(500).json({ error: 'Impossible de créer le paiement' });
  }
}
