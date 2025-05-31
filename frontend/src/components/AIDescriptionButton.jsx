// frontend/src/components/AIDescriptionButton.jsx
import { useState } from 'react';
import api from '../api/axios';

/**
 * Bouton de génération IA pour la description produit.
 *
 * Props :
 * - title      : string  — Nom du produit (obligatoire)
 * - setDesc    : fn      — Setter React pour injecter la description générée
 * - keywords   : string  — (optionnel) Mots-clés pour enrichir le prompt
 */
export default function AIDescriptionButton({ title = '', setDesc, keywords = '' }) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleClick = async () => {
    // Validation rapide
    if (!title.trim()) {
      setError('Indiquez d’abord le nom du produit.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // L’URL inclut UN SEUL /api car baseURL = host:port (sans /api)
      const { data } = await api.post('/ai/descriptions', {
        title: title.trim(),
        keywords: keywords.trim()
      });

      // On remplit le champ description dans le parent
      setDesc(data.description);
    } catch (err) {
      console.error('AIDescriptionButton error:', err);
      const msg =
        err.response?.data?.error ||
        'Impossible de générer la description.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || !title.trim()}
        className={`px-3 py-1 rounded-md text-sm text-white
          ${loading || !title.trim()
            ? 'bg-indigo-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'}
        `}
      >
        {loading ? 'Génération…' : 'Générer via IA'}
      </button>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
