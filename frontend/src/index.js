import React from 'react';                              // Import du cœur de React pour JSX, hooks, etc.
import ReactDOM from 'react-dom/client';               // Import de ReactDOM pour monter l’application dans le DOM
import { BrowserRouter } from 'react-router-dom';      // Composant pour gérer la navigation côté client (HTML5 History API)
import { AuthProvider } from './contexts/AuthContext';// Contexte global pour l’authentification (token + utilisateur)
import App from './App';                               // Composant racine de l’application
import './index.css';                                  // Import du fichier de styles globaux

// Récupération de la racine où l’application React sera montée
const root = ReactDOM.createRoot(document.getElementById('root'));

// Montage de l’arborescence React dans le DOM
root.render(
  // Mode strict de React pour détecter les problèmes potentiels
  <React.StrictMode>
    {/* Fournit le contexte d’authentification à tous les composants */}
    <AuthProvider>
      {/* Activates routing functionality throughout the app */}
      <BrowserRouter>
        {/* Composant principal qui contient toutes les routes */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
