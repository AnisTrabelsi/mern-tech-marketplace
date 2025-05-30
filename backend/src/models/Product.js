import mongoose from 'mongoose';

// Schéma du produit avec timestamps automatiques
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    default: 'Autre',
    trim: true
  },
  imageUrl: {
    type: String,
    default: '',
    validate: {
      validator: v =>
        !v || /^\/uploads\/.+\.(jpg|jpeg|png|gif)$/i.test(v),
      message: props => `${props.value} n'est pas une URL d'image valide`
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
