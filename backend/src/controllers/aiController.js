// backend/src/controllers/aiController.js
import OpenAI from 'openai';
import Product from '../models/Product.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model  = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

/**
 * POST /api/ai/descriptions
 * Body : { title, keywords }
 */
export async function generateDescription(req, res) {
  const { title, keywords = '' } = req.body;
  if (!title) return res.status(400).json({ error: 'Titre manquant.' });

  try {
    // Prompt marketing court (60‑100 mots)
    const prompt = [
      'Écris une description persuasive (60‑100 mots), en français, pour un produit e‑commerce.',
      `Titre : "${title.trim()}"`,
      keywords.trim() ? `Mots‑clés : ${keywords.trim()}` : '',
      '',
      'Description :'
    ].join('\n');

    const { choices } = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 120,
    });

    return res.json({ description: choices[0].message.content.trim() });
  } catch (err) {
    if (err.status === 429) {
      console.warn('OpenAI quota exceeded:', err.message);
      return res.status(503).json({ error: 'Service IA temporairement indisponible (quota).' });
    }
    console.error('OpenAI error (generateDescription):', err);
    return res.status(500).json({ error: 'Erreur serveur IA.' });
  }
}

/**
 * GET /api/ai/recommend/:productId
 * Retourne un tableau d’objets Product (max 4) similaires
 */
export async function recommendProducts(req, res) {
  try {
    const refProd = await Product.findById(req.params.productId);
    if (!refProd) return res.status(404).json({ error: 'Produit introuvable' });

    // Génère l'embedding du produit de référence (optionnel pour logique avancée)
    await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: `${refProd.name} ${refProd.description}`
    });

    // Fallback simple : même catégorie + prix proche (+/- 20 %)
    const priceMin = refProd.price * 0.8;
    const priceMax = refProd.price * 1.2;

    const similars = await Product.find({
      _id: { $ne: refProd._id },
      category: refProd.category,
      price: { $gte: priceMin, $lte: priceMax }
    }).limit(4);

    return res.json(similars);
  } catch (err) {
    console.error('OpenAI error (recommendProducts):', err);
    return res.status(500).json({ error: 'Erreur recommandation IA.' });
  }
}

/**
 * POST /api/ai/assistant
 * Body : { messages: [{ role:"user"|"assistant"|"system", content:String }] }
 * Répond avec { reply }
 */
// ---------------------------------------------------------------------------
// --- Assistant Chat d’achat -----------------------------------------------
// POST /api/ai/assistant
// Body : { messages: [ { role: 'user' | 'assistant' | 'system', content: String } ] }
// ---------------------------------------------------------------------------
export async function chatAssistant(req, res) {
  const { messages } = req.body;

  // Validation rapide
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages manquants.' });
  }

  // Prompt système pour cadrer le rôle du bot
  const SYSTEM_PROMPT = {
    role: 'system',
    content: `
Tu es un conseiller e-commerce très serviable qui parle français.
Ton objectif est d'aider le visiteur à trouver le produit idéal
en lui posant d'abord des questions sur ses besoins (budget, usage,
taille, marque préférée, etc.) puis en expliquant clairement ses
recommandations : liste à puces, ton amical, réponses courtes.`
  };

  try {
    const { choices } = await openai.chat.completions.create({
      model,
      messages: [SYSTEM_PROMPT, ...messages],
      temperature: 0.7,
      max_tokens: 300
    });

    return res.json({ reply: choices[0].message.content });
  } catch (err) {
    console.error('chatAssistant error:', err);

    if (err.status === 429) {
      return res
        .status(503)
        .json({ error: 'Quota OpenAI dépassé – réessayez plus tard.' });
    }
    return res.status(500).json({ error: 'Erreur assistant IA.' });
  }
}
