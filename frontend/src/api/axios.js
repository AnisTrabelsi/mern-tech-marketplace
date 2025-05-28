import axios from 'axios'; // Import de la librairie Axios pour effectuer des requêtes HTTP

// Création d'une instance Axios pré-configurée
const api = axios.create({
  // Définition de l'URL de base pour toutes les requêtes
  // Elle est lue depuis la variable d'environnement REACT_APP_API_URL
  baseURL: process.env.REACT_APP_API_URL,
});

// Export de l'instance pour réutiliser la même configuration partout dans l'app
export default api;
