
# Farm Management Backend API

Backend API robuste pour le système de gestion agricole, développé avec NestJS et MongoDB.

## Architecture

Ce projet suit l'architecture modulaire de NestJS avec les modules suivants :

- **Fields Module** : Gestion des champs
- **Harvests Module** : Gestion des récoltes
- **Sales Module** : Gestion des ventes
- **Clients Module** : Gestion des clients
- **Equipment Module** : Gestion des équipements
- **Inputs Module** : Gestion des intrants
- **Surfaces Module** : Gestion des surfaces

## Installation

```bash
# Installation des dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
```

## Configuration

Configurez votre base de données MongoDB dans le fichier `.env` :

```env
MONGODB_URI=mongodb://localhost:27017/farm-management
```

## Démarrage

```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

## Documentation API

Une fois le serveur démarré, accédez à la documentation Swagger :
- URL : http://localhost:3000/api/docs

## Endpoints principaux

- **Fields** : `/fields`
- **Harvests** : `/harvests`
- **Sales** : `/sales`
- **Clients** : `/clients`
- **Equipment** : `/equipment`
- **Inputs** : `/inputs`
- **Surfaces** : `/surfaces`

## Fonctionnalités

- ✅ CRUD complet pour toutes les entités
- ✅ Validation des données avec class-validator
- ✅ Documentation API automatique avec Swagger
- ✅ Gestion des relations entre entités
- ✅ Gestion des stocks pour récoltes et intrants
- ✅ API RESTful avec codes de statut appropriés
- ✅ Gestion des erreurs centralisée

## Structure des données

Chaque module possède :
- **Schema** : Définition du modèle MongoDB
- **DTO** : Data Transfer Objects pour validation
- **Service** : Logique métier
- **Controller** : Endpoints API
- **Module** : Configuration du module

## Technologies utilisées

- **NestJS** : Framework Node.js
- **MongoDB** : Base de données NoSQL
- **Mongoose** : ODM pour MongoDB
- **Swagger** : Documentation API
- **Class Validator** : Validation des données
- **TypeScript** : Langage de programmation
