import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
  const { id } = useParams(); // récupère l’ID du produit dans l’URL

  return (
    <div style={{ padding: 20 }}>
      <h2>Détails du produit</h2>
      <p>Vous regardez le produit n° {id}.</p>
      {/* Ici vous ajouterez plus tard le fetch de /api/products/{id} */}
    </div>
  );
}
