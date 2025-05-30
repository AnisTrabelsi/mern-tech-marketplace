import Order from '../models/Order.js';
import Cart  from '../models/Cart.js';

/**
 * POST /api/orders
 * Crée une commande à partir du panier courant
 */
export async function createOrder(req, res) {
  try {
    // 1. Récupère le panier et peuple les produits (nom + prix)
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Panier vide' });
    }

    await cart.populate({
      path:    'items.product',
      select:  'name price',      // seulement ce dont on a besoin
      strictPopulate: false       // évite l’erreur si aucun produit
    });

    // 2. Vérifie qu’aucun produit n’a été supprimé depuis l’ajout au panier
    const missing = cart.items.find(i => !i.product);
    if (missing) {
      return res.status(400).json({ error: 'Produit introuvable, panier mis à jour.' });
    }

    // 3. Calcule le total
    const total = cart.items.reduce(
      (sum, i) => sum + i.product.price * i.qty,
      0
    );

    // 4. Crée la commande
    const order = await Order.create({
      user:  req.user._id,
      items: cart.items.map(i => ({
        product: i.product._id,
        name:    i.product.name,     // ✅ présent grâce au populate
        price:   i.product.price,    // ✅ idem
        qty:     i.qty
      })),
      total
    });

    // 5. Vide le panier
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error('Erreur createOrder:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/orders/:id  – détail d’une commande
 */
export async function getOrder(req, res) {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id
  });
  if (!order) return res.status(404).json({ error: 'Commande introuvable' });
  res.json(order);
}

/**
 * GET /api/orders  – historique
 */
export async function listOrders(req, res) {
  const orders = await Order
    .find({ user: req.user._id })
    .sort({ createdAt: -1 });
  res.json(orders);
}
