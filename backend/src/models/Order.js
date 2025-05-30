import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: {                               // réf. produit
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Product',
      required: true
    },
    name:  { type: String, required: true }, // snapshot du nom
    price: { type: Number, required: true }, // snapshot du prix
    qty:   { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user:  {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
      required: true
    },
    items:  [orderItemSchema],
    total:  { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

/* C’EST CE RETOUR QUI DONNE ACCÈS À .create(), .findOne(), etc. */
export default mongoose.model('Order', orderSchema);
