# AgroShop TG - Site E-commerce Performant pour Semences

Site web haute performance pour la vente de semences agricoles au Togo, avec section blog éducative.

## 🚀 Fonctionnalités

- **Catalogue de Produits**: Navigation intuitive des semences par catégorie
- **Section Blog**: Articles éducatifs et guides de plantation
- **Recherche Avancée**: Filtrage et recherche rapide
- **Design Responsive**: Optimisé mobile, tablette et desktop
- **Performance Optimale**: SSR, SSG, optimisation d'images
- **SEO Optimisé**: Métadonnées complètes et structured data

## 🛠️ Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling utility-first
- **React Icons** - Bibliothèque d'icônes

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build

# Démarrer en production
npm start
```

## 🌐 Pages Principales

- `/` - Page d'accueil
- `/produits` - Catalogue complet
- `/produits/[id]` - Détail produit
- `/blogs` - Liste des articles
- `/blogs/semences` - Guide des semences
- `/blogs/[slug]` - Article individuel
- `/contact` - Page de contact

## 🎨 Structure du Projet

```
agroshop-performance/
├── src/
│   ├── app/              # Pages Next.js
│   ├── components/       # Composants React réutilisables
│   ├── data/            # Données JSON (produits, blogs)
│   └── types/           # Types TypeScript
├── public/              # Assets statiques
└── Configuration files
```

## ⚡ Optimisations de Performance

1. **SSR/SSG**: Pages pré-rendues pour chargement ultra-rapide
2. **Image Optimization**: Formats WebP/AVIF automatiques
3. **Code Splitting**: Chargement dynamique des composants
4. **Caching**: ISR pour contenu dynamique
5. **Bundle Optimization**: Tree shaking et minification

## 🎯 Score Lighthouse Visé

- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 📱 Responsive Design

- Mobile First
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces

## 🌱 Données de Démonstration

Le site utilise des données JSON statiques pour la démonstration:
- 8 produits de semences
- 4 articles de blog
- Catégories: Légumes, Fruits, Céréales

Pour une version production, intégrez:
- Base de données (PostgreSQL, MongoDB)
- CMS (Strapi, Contentful)
- Système de paiement
- Gestion de stock

## 🚀 Déploiement

Le site est optimisé pour déploiement sur:
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **AWS Amplify**
- Tout hébergement Node.js

## 📄 License

MIT License - Libre d'utilisation et modification

## 👥 Support

Pour toute question ou support:
- Email: contact@agroshoptg.com
- GitHub Issues

---

Développé avec ❤️ pour l'agriculture togolaise
