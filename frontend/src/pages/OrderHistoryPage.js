import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Erreur historique :', err));
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Mes commandes</h2>
      {orders.map(o => (
        <Link
          key={o._id}
          to={`/orders/${o._id}`}
          className="block p-4 border rounded hover:shadow transition"
        >
          <div>Date : {new Date(o.createdAt).toLocaleString()}</div>
          <div>Montant : {o.total.toFixed(2)} €</div>
          <div>Statut : {o.status}</div>
        </Link>
      ))}
    </div>
  );
}
