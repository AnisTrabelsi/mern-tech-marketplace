// backend/index.js

// 1) Charger .env dès le tout début
import dotenv from 'dotenv';
dotenv.config();

// 2) Maintenant on peut importer le reste de l’app
import app from './src/app.js';

// (Optionnel) Vérifiez en console que la variable est bien lue :
console.log('🔐 JWT_SECRET =', process.env.JWT_SECRET);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
