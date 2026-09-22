# BookMe

Application web de gestion de rendez-vous développée avec React et TypeScript.

## Fonctionnalités

- Consultation des prestations
- Choix d'une date et d'un créneau
- Validation des formulaires
- Création de réservations
- Gestion des rendez-vous
- Modification du statut
- Email client
- Email administrateur
- Gestion des erreurs
- Responsive design

## Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Axios

### Backend
- Node.js
- Express
- Resend

## Architecture

Le projet utilise une architecture orientée features.

```text
src/
├── app/
├── features/
│   ├── booking/
│   ├── services/
│   └── admin/
├── pages/
└── shared/
```
---
## Gestion de l'état
useState : état local
Zustand : état client partagé
TanStack Query : état serveur
Optimisations
Lazy loading

Les pages sont chargées à la demande avec React.lazy.

## Cache

TanStack Query permet de réduire les appels réseau grâce à son système de cache.

## Tests

Les tests utilisent Vitest et React Testing Library.

Lancer :

npm test
## Installation

Frontend :

- cd client
- npm install
- npm run dev

Backend :

- cd server
- npm install
- npm run dev
  
Variables d'environnement

Créer :

server/.env

Ajouter :

- RESEND_API_KEY=...
- ADMIN_EMAIL=...

## Évolutions futures
- Paiement d'acompte avec Stripe
- Synchronisation Google Calendar

---
