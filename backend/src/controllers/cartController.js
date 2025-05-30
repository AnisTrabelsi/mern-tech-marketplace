// backend/src/controllers/cartController.js

import Cart from '../models/Cart.js';

/**
 * GET /api/cart
 * Récupère le panier de l’utilisateur (avec peuplement de la référence produit)
 */
export async function getCart(req, res) {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      // Retourne un objet vide si l’utilisateur n’a pas encore de panier
      return res.json({ items: [] });
    }
    return res.json(cart);
  } catch (err) {
    console.error('Get cart error:', err);
    return res.status(500).json({ error: 'Erreur serveur lors de la récupération du panier' });
  }
}

/**
 * POST /api/cart
 * Ajoute ou met à jour un article dans le panier
 * Corps attendu : { productId: string, qty: number }
 */
export async function updateCart(req, res) {
  try {
    const { productId, qty } = req.body;

    // Récupère (ou crée) le panier de l’utilisateur
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Trouve l’index de l’article dans le tableau
    const idx = cart.items.findIndex(i => i.product.toString() === productId);

    if (idx > -1) {
      // Si qty > 0 on met à jour, sinon on retire l’article
      if (qty > 0) {
        cart.items[idx].qty = qty;
      } else {
        cart.items.splice(idx, 1);
      }
    } else if (qty > 0) {
      // Nouvel article
      cart.items.push({ product: productId, qty });
    }

    // Sauvegarde et peuple avant de renvoyer
    await cart.save();
    await cart.populate('items.product');

    return res.json(cart);
  } catch (err) {
    console.error('Update cart error:', err);
    return res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du panier' });
  }
}

/**
 * DELETE /api/cart/:productId
 * Supprime un article spécifique du panier
 */
export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(i => i.product.toString() !== productId);
      await cart.save();
      await cart.populate('items.product');
      return res.json(cart);
    }
    // Pas de panier : on renvoie un panier vide
    return res.json({ items: [] });
  } catch (err) {
    console.error('Remove from cart error:', err);
    return res.status(500).json({ error: 'Erreur serveur lors de la suppression de l’article' });
  }
}

/**
 * DELETE /api/cart
 * Vide entièrement le panier de l’utilisateur
 */
export async function clearCart(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    return res.json({ message: 'Panier vidé' });
  } catch (err) {
    console.error('Clear cart error:', err);
    return res.status(500).json({ error: 'Erreur serveur lors du vidage du panier' });
  }
}
