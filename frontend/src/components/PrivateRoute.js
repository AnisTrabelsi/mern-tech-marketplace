import React, { useContext } from 'react';             // React hook pour accéder aux contextes
import { Navigate } from 'react-router-dom';      // Composant pour rediriger vers une autre route
import { AuthContext } from '../contexts/AuthContext'; // Contexte global qui stocke le token et l’utilisateur

/**
 * PrivateRoute
 *  
 * Ce composant protège une route en vérifiant la présence d’un token JWT.
 * Si l’utilisateur est authentifié (token présent), on affiche les enfants (children).
 * Sinon, on le redirige vers la page de connexion (/login).
 */
export default function PrivateRoute({ children }) {
  // Récupération du token depuis le contexte d’authentification
  const { token } = useContext(AuthContext);

  // Si le token existe, on rend les enfants ; sinon, on redirige vers /login
  return token 
    ? children 
    : <Navigate to="/login" />;
}
