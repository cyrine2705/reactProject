# ReactProject - Application de Gestion de Posts

Une application React robuste pour la gestion de posts, construite avec TypeScript, Vite et un style soigné. Ce projet démontre les opérations CRUD, l'Authentification et la Gestion d'État Local.

## Fonctionnalités

- **Système d'Authentification** :
  - Page de connexion sécurisée avec indice de mot de passe masqué (`admin***`).
  - Routes Protégées : Utilisation de `PrivateRoute` pour restreindre l'accès au tableau de bord et aux fonctionnalités de gestion.
  - Session Persistante : Le statut d'authentification est sauvegardé dans le `localStorage`.

- **Gestion des Posts (CRUD)** :
  - **Créer** : Ajout de nouveaux posts avec mise à jour immédiate de la liste.
  - **Lire** : Affichage de tous les posts sur le tableau de bord et vues détaillées pour chaque post.
  - **Mettre à jour** : Édition des posts existants (supporte à la fois les posts récupérés via API et ceux créés localement).
  - **Supprimer** : Suppression de posts avec une modale de confirmation personnalisée.
  - **Persistance Locale** : Utilise `PostContext` pour gérer l'état, permettant aux opérations CRUD de persister durant la session malgré l'utilisation d'une API fictive en lecture seule (JSONPlaceholder).

- **UI/UX** :
  - Barre de navigation responsive avec rendu conditionnel (cache le bouton "Login" sur la page de connexion, affiche l'icône "Logout" une fois connecté).
  - Fonctionnalité "Retour en haut" au clic sur le bouton Home.
  - Styles soignés avec Vanilla CSS et Variables CSS pour une esthétique sombre premium.
  - Footer personnalisé.

### Démonstration Complète
![Démonstration](./screenshots/demo.webp)

## Stack Technique

- **Frontend** : React, TypeScript, Vite
- **Routage** : React Router DOM (v6)
- **Client HTTP** : Axios
- **Style** : Vanilla CSS (Scoped & Global)
- **API** : JSONPlaceholder (Mock API)

## Installation et Démarrage

1.  **Installer les dépendances** :
    ```bash
    npm install
    ```

2.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```

3.  **Construire pour la production** :
    ```bash
    npm run build
    ```

## Identifiants

- **Mot de passe** : `admin123`

## Structure du Projet

```
src/
├── components/       # Composants UI (Login, Posts, PostDetails, etc.)
├── context/          # Fournisseurs de Contexte (AuthContext, PostContext)
├── service/          # Service API (Configuration Axios)
├── App.tsx           # Application Principale & Routage
└── index.css         # Styles Globaux & Variables
```

## Notes pour les Développeurs

- Le projet utilise une **Mock API** (JSONPlaceholder). La persistance réelle est simulée via `PostContext` pour assurer une expérience utilisateur fluide où les posts ajoutés/modifiés restent visibles durant la session.
- Des validations sont en place pour gérer les ID locaux (IDs > 100) afin d'éviter les erreurs API lors des mises à jour/suppressions.
