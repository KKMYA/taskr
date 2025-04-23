# TaskR

TaskR est une application web de gestion de tâches, développée avec Angular en front-end et Symfony en back-end.

## 🔧 Stack technique

- **Frontend** : Angular
- **Backend** : Symfony (API REST avec authentification JWT)
- **Base de données** : PostgreSQL

## 📁 Structure du projet

  taskr/
      |
      ├── task-manager-front/ # Application Angular 
      |
      └── task-manager-back/ # API Symfony


## 🚀 Lancer le projet en local

## 1. Backend (Symfony)
```
cd task-manager-back/
composer install
cp .env.example .env
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony server:start
```

### Configuration :

Ouvre le fichier .env et configure ta base de données, ex. :
``DATABASE_URL="postgresql://user:password@127.0.0.1:5432/taskr"``

### Génération des clés JWT :

``mkdir -p config/jwt``
``openssl genrsa -out config/jwt/private.pem -aes256 4096``
``openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem``

Tu peux définir la passphrase dans .env :

``JWT_PASSPHRASE=ta-passphrase``

### Initialisation de la base de données :

``php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate``

### Lancer le serveur : 

``symfony server:start``


## 2. Frontend (Angular)
``cd task-manager-front/``
``npm install``
``ng serve``


📦 Fonctionnalités

✅ Authentification JWT

✅ Affichage des tâches par utilisateur

✅ Création / édition / suppression de tâches

✅ Interface responsive

🔐 Sécurité

Le fichier .env, les clés JWT, vendor/, etc. sont exclus du dépôt via .gitignore.

🧑‍💻 Développement
Ce projet est en cours de développement.
