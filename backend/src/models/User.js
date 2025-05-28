import mongoose from 'mongoose'; // Import de Mongoose pour interagir avec MongoDB

// Définition du schéma "User" avec les différents champs et leurs contraintes
const userSchema = new mongoose.Schema({
  email: { 
    type: String,      // Type de donnée : chaîne de caractères
    required: true,    // Champ obligatoire
    unique: true       // Doit être unique dans la collection
  },
  password: { 
    type: String,      // Mot de passe hashé, stocké en tant que chaîne
    required: true     // Champ obligatoire
  },
  role: { 
    type: String, 
    enum: ['user','admin'],  // Valeurs autorisées : "user" ou "admin"
    default: 'user'          // Valeur par défaut si non précisé
  },
  createdAt: { 
    type: Date,         // Type de donnée : date
    default: Date.now   // Valeur par défaut : date de création du document
  }
});

// Création et export du modèle "User" basé sur le schéma défini
export default mongoose.model('User', userSchema);
