// routes/stripe.js  ─ ton code
import express from 'express';
import Stripe  from 'stripe';

const router = express.Router();
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/stripe/create-payment-intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;                // ex. 1299 = 12,99 €
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Montant invalide' });
    }

    const pi = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Erreur Stripe' });
  }
});

export default router;
