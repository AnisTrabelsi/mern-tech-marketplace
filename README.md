# 🛒 MERN Marketplace

MERN Marketplace est une application **e-commerce complète** construite avec la stack **MERN** (MongoDB, Express.js, React, Node.js).  
Elle permet la gestion des **utilisateurs, produits, panier, commandes et paiements Stripe**, avec une interface moderne en **React + TailwindCSS** et une intégration **IA** pour enrichir l’expérience utilisateur.

---

## 🚩 Fonctionnalités principales

- 🔑 **Authentification & Autorisation**
  - JWT (connexion / inscription / rôles).
  - Middleware de sécurité.
- 👤 **Gestion des utilisateurs** (MongoDB).
- 📦 **Produits**
  - CRUD complet (ajout, édition, suppression, listing).
  - Upload d’images produits.
  - Génération de descriptions via IA.
- 🛒 **Panier & Commandes**
  - Ajout/suppression d’articles.
  - Suivi des commandes et historique.
- 💳 **Paiement Stripe** (Checkout).
- 🤖 **Assistant IA** (chat et suggestions produits).
- 📊 **Dashboard React**
  - Pages dédiées : produits, panier, commandes, login/register.
  - Notifications Toast.
- 🐳 **Dockerisation complète**
  - Frontend & Backend dans des conteneurs.
- ⚙️ **CI/CD GitHub Actions**
  - Build + déploiement automatisé.

---

## 🏗️ Stack technique

### 🔙 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Stripe API
- JWT Auth
- Multer (upload images)

### 🔜 Frontend
- React 18 (Vite)
- TailwindCSS
- Context API (Auth, Panier)
- Axios

### 🛠️ DevOps / Infra
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Nginx (proxy dans certains déploiements)

---

## 📂 Structure du projet

```
MERN-MARKETPLACE/
├── backend/              # API Express (controllers, routes, models)
│   ├── src/
│   │   ├── controllers/  # Logique métiers (auth, produits, commandes, stripe…)
│   │   ├── middleware/   # Auth, Upload
│   │   ├── models/       # Schémas Mongoose (User, Product, Order, Cart)
│   │   ├── routes/       # Routes REST
│   │   └── app.js        # Config Express
│   ├── Dockerfile
│   └── package.json
│
├── frontend/             # Interface React (pages, components, contexts)
│   ├── src/
│   │   ├── api/          # Axios config
│   │   ├── components/   # Header, Checkout, Assistant IA…
│   │   ├── contexts/     # Auth & Panier
│   │   ├── pages/        # Home, Login, Cart, Product, Orders…
│   │   └── App.js        # Entrée principale React
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yaml   # Orchestration backend + frontend
├── .github/workflows/    # CI/CD (GitHub Actions)
├── README.md             # 📖 Documentation
└── .env                  # Variables d’environnement
```

---

## ⚙️ Installation & Lancement

### 1️⃣ Cloner le repo
```bash
git clone https://github.com/AnisTrabelsi/mern-tech-marketplace.git
cd MERN-MARKETPLACE
```

### 2️⃣ Backend
```bash
cd backend
npm install
npm run dev   # démarre API sur http://localhost:5000
```

⚠️ Crée un fichier `.env` dans `backend/` :
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_marketplace
JWT_SECRET=ton_secret
STRIPE_SECRET_KEY=sk_test_...
```

### 3️⃣ Frontend
```bash
cd frontend
npm install
npm start   # démarre React sur http://localhost:3000
```

⚠️ Crée un fichier `.env` dans `frontend/` :
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐳 Docker

### Build & run avec Docker Compose
```bash
docker-compose up --build
```

Cela démarre :
- **Backend** → `http://localhost:5000`
- **Frontend** → `http://localhost:3000`

---

## 🚀 Déploiement CI/CD (GitHub Actions)

- Build & tests déclenchés à chaque `push`.
- Docker images buildées et poussées.
- Déploiement automatisé (adapter selon ton infra : VPS, AWS, etc.).

Le workflow est défini dans :
```
.github/workflows/deploy.yml
```

---

## ✅ Tests

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

---

## 📌 Améliorations futures

- [ ] Ajout de tests E2E (Cypress / Playwright).
- [ ] Intégration monitoring (Prometheus + Grafana).
- [ ] Stockage d’images via S3 (au lieu de `uploads/` local).
- [ ] Déploiement cloud (AWS, Azure, ou GCP).
- [ ] Sécurisation avancée (rate limiting, helmet).

---

## 👨‍💻 Auteur

Projet repris et maintenu par **[Ton Nom]**  
✨ Contributions & PR bienvenues !

