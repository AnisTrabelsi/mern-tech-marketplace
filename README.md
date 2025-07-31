# 🛒 MERN Marketplace

MERN Marketplace est une application e-commerce complète construite avec la stack MERN (MongoDB, Express.js, React, Node.js).  
Elle permet la gestion des utilisateurs, produits, panier, commandes et paiements Stripe, avec une interface moderne en React + TailwindCSS et une intégration IA pour enrichir l’expérience utilisateur.

---

## 🚩 Fonctionnalités principales

| Fonctionnalité              | Détails                                                                 |
| -------------------------- | ------------------------------------------------------------------------ |
| 🔑 Authentification & Rôles | JWT (connexion / inscription / rôles), middleware de sécurité           |
| 👤 Utilisateurs              | CRUD complet (profil, gestion admin) via MongoDB                        |
| 📦 Produits                  | CRUD produits, upload images, génération de descriptions via IA         |
| 🛒 Panier & Commandes        | Ajout/suppression articles, suivi & historique des commandes            |
| 💳 Paiement Stripe           | Intégration Checkout & webhooks                                         |
| 📃 Génération IA de description | Endpoint POST /api/ai/descriptions — génère automatiquement une description persuasive pour un produit |
| 💬 Chat Assistant d’achat     | Endpoint POST /api/ai/assistant — chat conversationnel avec l’utilisateur |
| 🧠 Recommandation de produits | Endpoint GET /api/ai/recommend/:id — suggère des produits similaires (même catégorie, prix ±20%) |
| 📊 Dashboard React           | Pages produits, panier, commandes, login/register + notifications toast |
| 🐳 Dockerisation             | Backend & Frontend conteneurisés                                        |
| ⚙️ CI/CD GitHub Actions      | Build + déploiement automatisé                                          |

---

## 🏗️ Stack technique

| Côté        | Technologies principales                                                 |
|-------------|--------------------------------------------------------------------------|
| 🔙 Backend  | Node.js + Express, MongoDB + Mongoose, Stripe API, JWT, Multer, OpenAI   |
| 🔜 Frontend | React 18 (Vite), TailwindCSS, Context API, Axios                         |
| 🛠️ DevOps   | Docker & Compose, GitHub Actions (CI/CD), Nginx (proxy)                  |

---

## 📂 Structure du projet

| Dossier / Fichier     | Description                                                  |
|-----------------------|--------------------------------------------------------------|
| backend/              | API Express (controllers, routes, models, middleware, uploads) |
| frontend/             | App React (pages, components, contexts, API, assistant IA)   |
| docker-compose.yaml   | Orchestration Backend + Frontend                             |
| .github/workflows/    | Workflows CI/CD (déploiement GitHub Actions)                 |
| .env                  | Variables d’environnement                                     |
| README.md             | Documentation du projet                                      |

---

## ⚙️ Installation & Lancement

| Étape         | Commande / Action                                                                 |
|---------------|------------------------------------------------------------------------------------|
| 1️⃣ Cloner     | git clone https://github.com/AnisTrabelsi/mern-tech-marketplace.git && cd MERN-MARKETPLACE |
| 2️⃣ Backend    | cd backend && npm install && npm run dev → http://localhost:5000                 |
| ⚠️ Backend .env | PORT=5000<br>MONGO_URI=mongodb://localhost:27017/mern_marketplace<br>JWT_SECRET=...<br>STRIPE_SECRET_KEY=...<br>OPENAI_API_KEY=...<br>OPENAI_MODEL=gpt-3.5-turbo |
| 3️⃣ Frontend   | cd frontend && npm install && npm start → http://localhost:3000                  |
| ⚠️ Frontend .env | REACT_APP_API_URL=http://localhost:5000/api<br>REACT_APP_STRIPE_PUBLISHABLE_KEY=... |

---

## 🐳 Docker

| Action         | Commande                    |
|----------------|-----------------------------|
| Build & lancer | docker-compose up --build   |
| Stop           | docker-compose down         |

📌 Démarre automatiquement :
- Backend → http://localhost:5000
- Frontend → http://localhost:3000

---

## 🚀 Déploiement CI/CD (GitHub Actions)

| Étape         | Description                                                    |
|---------------|----------------------------------------------------------------|
| Build & Tests | Déclenchés à chaque push                                       |
| Docker Images | Buildées et poussées sur le registry                           |
| Déploiement   | Automatisé (VPS, AWS, Azure, GCP selon l’infra cible)         |

📂 Fichier workflow : .github/workflows/deploy.yml

---

## ✅ Tests

| Cible    | Commande                 |
|----------|--------------------------|
| Backend  | cd backend && npm test   |
| Frontend | cd frontend && npm test  |

---

## 📌 Améliorations futures

| Amélioration                          | Statut |
|--------------------------------------|--------|
| Ajout de tests E2E (Cypress)         | 🔜     |
| Monitoring (Prometheus/Grafana)      | 🔜     |
| Stockage d’images sur S3             | 🔜     |
| Déploiement Cloud (AWS/GCP)          | 🔜     |
| Sécurisation avancée (Helmet, Rate limiting) | 🔜 |
