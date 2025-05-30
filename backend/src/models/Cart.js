import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    product: {                    // Référence vers Product
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Product',
      required: true
    },
    qty: { type: Number, required: true, min: 1 }
  },
  { _id: false }                  // pas de sous-_id pour chaque item
);

const cartSchema = new mongoose.Schema(
  {
    user: {                       // 1 panier ⟶ 1 utilisateur
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
      unique: true,
      required: true
    },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

/* 👇 C’est CE retour de `mongoose.model()` qui donne accès à .findOne() */
export default mongoose.model('Cart', cartSchema);
