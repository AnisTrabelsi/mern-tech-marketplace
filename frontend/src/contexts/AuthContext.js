import React, { createContext, useState, useEffect } from 'react';
// Import du client Axios pré-configuré pour les appels API
import api from '../api/axios';

// Création du contexte d’authentification (token + utilisateur)
export const AuthContext = createContext();

/**
 * AuthProvider
 * Fournit le contexte d’authentification à toute l’application.
 * Gère le token JWT, l’utilisateur courant et configure Axios.
 */
export function AuthProvider({ children }) {
  // Récupère le token depuis le localStorage (s’il existe), sinon null
  const [token, setToken] = useState(localStorage.getItem('token'));
  // Stocke les données de l’utilisateur (peut être rempli plus tard via /me)
  const [user, setUser] = useState(null);

  // Effet déclenché à chaque changement de "token"
  useEffect(() => {
    if (token) {
      // Sauvegarde le token en localStorage pour persistance entre rechargements
      localStorage.setItem('token', token);
      // Configure l'en-tête Authorization par défaut pour toutes les requêtes Axios
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      // Optionnel : ici, on pourrait appeler api.get('/auth/me') pour récupérer user
      api.get('/auth/me').then(res => setUser(res.data));

    } else {
      // Si pas de token, on le retire du localStorage
      localStorage.removeItem('token');
      // Et on supprime l'en-tête Authorization de la configuration Axios
      delete api.defaults.headers.common.Authorization;
       setUser(null);
    }
  }, [token]); // Ne se réexécute que lorsque le token change

  // Valeurs partagées : token, setter du token, user, setter du user
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
