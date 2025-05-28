// Import de l’application Express configurée dans src/app.js
import app from './src/app.js';

// Récupération du port depuis les variables d’environnement, 
// ou utilisation du port 5000 par défaut si non défini
const PORT = process.env.PORT || 5000;

// Démarrage du serveur : écoute sur le port défini
// Lorsque le serveur est bien lancé, on affiche un message en console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
