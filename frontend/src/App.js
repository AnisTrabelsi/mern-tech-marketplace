import React, { useEffect, useState } from 'react'; // On importe React lui-même car ESLint (react/react-in-jsx-scope) exige que React soit en scope pour reconnaître le JSX

import axios from 'axios';

function App() {
  // Déclare un état local "status", initialisé à "..."
  const [status, setStatus] = useState('...');

  // useEffect avec tableau de dépendances vide s'exécute une seule fois au montage
  useEffect(() => {
    // Requête GET vers l’API pour récupérer le statut
    axios.get(`${process.env.REACT_APP_API_URL}/status`)
      .then(res => 
        // En cas de succès, met à jour l’état avec la réponse de l’API
        setStatus(res.data.status)
      )
      .catch(() => 
        // En cas d’erreur (API inaccessible, etc.), affiche "Erreur"
        setStatus('Erreur')
      );
  }, []); // [] : pas de dépendances, effet non répété

  // Rendu du composant
  return (
    <div style={{ padding: 20 }}>
      <h1>Marketplace MERN</h1>
      <p>API status : {status}</p> {/* Affiche la valeur de "status" */}
    </div>
  );
}

export default App; // Exporte le composant pour qu’il puisse être monté dans index.js
