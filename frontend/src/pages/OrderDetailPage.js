// src/pages/OrderDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams }                  from 'react-router-dom';
import api                            from '../api/axios';

export default function OrderDetailPage() {
  const { id }       = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`)
       .then(res => setOrder(res.data))
       .catch(() => setOrder(null));
  }, [id]);

  if (!order) return <p className="p-6">Chargement…</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Commande n° {order._id}</h1>

      <div className="mb-6 space-y-2">
        {order.items.map(it => (
          <div key={it.product} className="flex justify-between">
            <span>{it.name} × {it.qty}</span>
            <span>{(it.price * it.qty).toFixed(2)} €</span>
          </div>
        ))}
        <div className="font-bold text-right">
          Total&nbsp;: {order.total.toFixed(2)} €
        </div>
      </div>
    </div>
  );
}
