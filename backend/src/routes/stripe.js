import express from 'express';
import Stripe  from 'stripe';

const router = express.Router();

// Clé secrète Stripe (backend)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/stripe/create-payment-intent
 * body : { amount: <total en cents> }
 * renvoie : { clientSecret }
 */
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;                          // ex. 1299 = 12,99 €
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Montant invalide' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true }        // carte + ApplePay, etc.
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error :', err);
    res.status(500).json({ error: 'Erreur Stripe' });
  }
});

export default router;
