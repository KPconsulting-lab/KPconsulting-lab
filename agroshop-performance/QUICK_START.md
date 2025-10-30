# 🚀 Démarrage Rapide - AgroShop TG

Guide de démarrage en 5 minutes pour lancer le site localement.

## ✅ Prérequis

- Node.js 18+ installé
- npm ou yarn
- Terminal / Command Line

## 📥 Installation

### 1. Cloner et installer

```bash
cd agroshop-performance
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur: **http://localhost:3000**

## 🌐 Navigation du Site

### Pages Principales

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Page d'accueil avec présentation |
| Produits | `/produits` | Catalogue complet des semences |
| Détail Produit | `/produits/1` | Page d'un produit spécifique |
| Blog | `/blogs` | Liste des articles |
| Guide Semences | `/blogs/semences` | Guide complet des semences |
| Article | `/blogs/guide-complet-plantation-semences` | Article individuel |
| Contact | `/contact` | Page de contact |

## 📁 Structure des Fichiers Importants

```
agroshop-performance/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 🏠 Page d'accueil
│   │   ├── layout.tsx            # Layout global
│   │   ├── produits/
│   │   │   ├── page.tsx          # 📦 Liste produits
│   │   │   └── [id]/page.tsx    # 🔍 Détail produit
│   │   └── blogs/
│   │       ├── page.tsx          # 📝 Liste articles
│   │       ├── semences/page.tsx # 🌱 Guide semences
│   │       └── [slug]/page.tsx  # 📄 Article
│   ├── components/
│   │   ├── Header.tsx            # Navigation
│   │   ├── Footer.tsx            # Pied de page
│   │   ├── ProductCard.tsx       # Carte produit
│   │   ├── BlogCard.tsx          # Carte article
│   │   └── SearchBar.tsx         # Barre de recherche
│   ├── data/
│   │   ├── products.json         # 📊 Données produits
│   │   └── blogs.json            # 📊 Données blog
│   └── types/
│       └── index.ts              # Types TypeScript
```

## 🎨 Personnalisation Rapide

### Modifier les Couleurs

Éditer `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#22c55e',  // Couleur principale
    600: '#16a34a',  // Couleur hover
    // ...
  }
}
```

### Ajouter des Produits

Éditer `src/data/products.json`:

```json
{
  "id": "9",
  "name": "Nouveau Produit",
  "category": "legumes",
  "price": 3000,
  "description": "Description du produit",
  "stock": 100,
  "plantingSeason": ["Printemps"],
  "harvestTime": "60 jours",
  "features": ["Feature 1", "Feature 2"]
}
```

### Ajouter des Articles

Éditer `src/data/blogs.json`:

```json
{
  "id": "5",
  "slug": "mon-nouvel-article",
  "title": "Mon Nouvel Article",
  "excerpt": "Résumé court",
  "content": "Contenu complet avec markdown",
  "category": "Guides",
  "author": "Nom Auteur",
  "date": "2024-11-01",
  "readTime": "5 min",
  "tags": ["tag1", "tag2"]
}
```

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev          # Lancer le serveur dev

# Production
npm run build        # Builder pour production
npm start            # Lancer en mode production

# Autres
npm run lint         # Vérifier le code
```

## 🐛 Résolution de Problèmes

### Port 3000 déjà utilisé

```bash
# Utiliser un autre port
PORT=3001 npm run dev
```

### Erreurs d'installation

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreurs de build

```bash
# Nettoyer le cache Next.js
rm -rf .next
npm run build
```

## 📦 Build et Déploiement

### Build Local

```bash
npm run build
npm start
```

Le site sera sur: **http://localhost:3000**

### Déploiement sur Vercel (Recommandé)

1. Push sur GitHub
2. Connecter à Vercel
3. Déploiement automatique! ✅

### Variables d'environnement (Optionnel)

Créer `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://agroshoptg.com
```

## 🎯 Prochaines Étapes

### Pour le Développement

1. ✅ Modifier les données dans `/src/data/`
2. ✅ Personnaliser les couleurs dans `tailwind.config.js`
3. ✅ Ajouter vos images dans `/public/images/`
4. ✅ Modifier les informations de contact

### Pour la Production

1. 🔐 Intégrer une vraie base de données (PostgreSQL, MongoDB)
2. 💳 Ajouter un système de paiement (Stripe, PayPal)
3. 👤 Créer un système d'authentification
4. 📧 Configurer l'envoi d'emails
5. 📊 Ajouter Analytics (Google Analytics, Vercel Analytics)
6. 🛡️ Ajouter un CMS (Strapi, Contentful)

## 📚 Documentation

- **Architecture**: Voir `ARCHITECTURE.md`
- **Optimisations**: Voir `OPTIMIZATIONS.md`
- **README**: Voir `README.md`

## 💡 Conseils Pro

### Performance

- Les images sont lazy-loaded automatiquement
- Le code est split automatiquement
- Les pages sont pré-rendues pour SEO

### SEO

- Métadonnées configurées pour chaque page
- Sitemap automatique avec Next.js
- Structured data ready

### Développement

- Hot reload activé
- TypeScript pour type safety
- ESLint configuré

## 🆘 Support

Besoin d'aide?

1. Consulter les docs Next.js: https://nextjs.org/docs
2. Consulter les docs Tailwind: https://tailwindcss.com/docs
3. Vérifier les Issues GitHub

## ✨ Fonctionnalités Clés

- ✅ Site ultra-rapide (< 1s chargement)
- ✅ 100% responsive (mobile, tablet, desktop)
- ✅ SEO optimisé
- ✅ Design moderne et professionnel
- ✅ Accessible (WCAG)
- ✅ TypeScript pour moins de bugs
- ✅ Facile à personnaliser

---

🎉 **Bon développement!** Le site est prêt à être personnalisé selon vos besoins.
