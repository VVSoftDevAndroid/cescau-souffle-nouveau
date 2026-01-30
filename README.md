# Cescau, un souffle nouveau

Site web de la liste électorale "Cescau, un souffle nouveau" pour les élections municipales de Cescau (09800), Ariège, Occitanie.

## 🌿 Aperçu

Un site statique élégant présentant l'équipe, les projets et la beauté du village de Cescau. Le site utilise un design aux couleurs des montagnes ariégeoises (vert forêt, bleu montagne) avec des animations fluides et une expérience utilisateur soignée.

## 🚀 Démarrage rapide

### Développement local

1. Clonez le repository
2. Lancez un serveur local (nécessaire pour le chargement des fichiers JSON) :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx serve

# Avec PHP
php -S localhost:8000
```

3. Ouvrez `http://localhost:8000` dans votre navigateur

### Déploiement

Le site est prêt à être déployé sur :
- **GitHub Pages** : Poussez sur la branche `main` et activez GitHub Pages dans les paramètres
- **Netlify** : Glissez-déposez le dossier du projet ou connectez votre repository

## 📁 Structure du projet

```
cescau-souffle-nouveau/
├── index.html          # Page d'accueil
├── equipe.html         # Page de l'équipe
├── village.html        # Galerie du village
├── projets.html        # Page des projets
├── css/
│   └── style.css       # Styles (CSS Custom Properties)
├── js/
│   ├── main.js         # JavaScript principal
│   └── audio-player.js # Lecteur audio flottant
├── data/
│   ├── site.json       # Configuration du site
│   ├── team.json       # Données de l'équipe
│   ├── projects.json   # Données des projets
│   └── gallery.json    # Données de la galerie
├── images/
│   ├── hero/           # Images du héro et de la homepage
│   ├── team/           # Photos de l'équipe
│   └── village/        # Photos du village
└── audio/
    └── musique.mp3     # Fichier audio (optionnel)
```

## ✏️ Mise à jour du contenu

### Modifier l'équipe

Éditez `data/team.json` :

```json
{
  "members": [
    {
      "id": "1",
      "name": "Prénom Nom",
      "role": "Rôle",
      "bio": "Courte biographie...",
      "image": "images/team/photo.jpg"
    }
  ]
}
```

### Modifier les projets

Éditez `data/projects.json` :

```json
{
  "current": [
    {
      "id": "1",
      "title": "Titre du projet",
      "description": "Description...",
      "status": "En cours",
      "icon": "🏛️"
    }
  ],
  "upcoming": [...]
}
```

### Modifier la galerie

Éditez `data/gallery.json` :

```json
{
  "images": [
    {
      "id": "1",
      "src": "images/village/photo.jpg",
      "caption": "Description de l'image",
      "featured": true
    }
  ]
}
```

## 🖼️ Ajouter des images

### Photos de l'équipe
- Format recommandé : JPEG ou WebP
- Dimensions : 400x400 pixels (carré)
- Placez les fichiers dans `images/team/`

### Photos du village
- Format recommandé : JPEG ou WebP
- Dimensions : 800x600 pixels minimum
- Placez les fichiers dans `images/village/`

### Image du héro
- Format recommandé : JPEG ou WebP
- Dimensions : 1920x1080 pixels
- Placez le fichier dans `images/hero/hero-mountain.jpg`

## 🎵 Audio (optionnel)

Pour activer le lecteur audio :
1. Placez un fichier MP3 dans `audio/musique.mp3`
2. Modifiez `data/site.json` pour personnaliser le titre et l'artiste

## 🎨 Personnalisation des couleurs

Les couleurs sont définies dans `css/style.css` via CSS Custom Properties :

```css
:root {
  --green-forest: #2D5A3D;    /* Vert principal */
  --blue-mountain: #4A7C9B;   /* Bleu des montagnes */
  --cream: #F5F2EB;           /* Fond crème */
  --gold-accent: #C9A227;     /* Accent doré */
}
```

## 📱 Responsive Design

Le site est optimisé pour :
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

## 🔧 Technologies

- **HTML5** avec sémantique
- **CSS3** (Custom Properties, Grid, Flexbox)
- **JavaScript ES6** (Vanilla, pas de framework)
- **Google Fonts** (Playfair Display, Inter)

## 📄 Licence

© 2026 Cescau, un souffle nouveau. Tous droits réservés.
