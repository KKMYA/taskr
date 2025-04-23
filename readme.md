# TaskR

TaskR is a web application for task management, built with Angular for the frontend and Symfony for the backend.

## 🔧 Tech Stack

- **Frontend**: Angular
- **Backend**: Symfony (REST API with JWT authentication)
- **Database**: PostgreSQL

---

## 📁 Project Structure



## 📁 Structure du projet
```
taskr/
│
├── task-manager-front/           # Angular application
│   ├── src/                      # Angular source code
│   │   ├── app/                  # Components, services, modules
│   │   └── assets/               # Static assets (images, styles)
│   ├── angular.json              # Angular CLI configuration
│   ├── package.json              # npm dependencies
│   └── tsconfig.json             # TypeScript configuration
│
└── task-manager-back/            # Symfony API
    ├── src/                      # PHP source code 
    │   ├── Controller/           # REST API controllers
    │   ├── Entity/               # Doctrine entities
    │   ├── Repository/           # Doctrine repositories
    │   └── DataFixtures/         # Demo/test data fixtures
    ├── config/                   # Symfony configuration 
    │   ├── packages/             # Bundle configs
    │   └── routes.yaml           # Routes definition
    ├── migrations/               # Doctrine migrations
    ├── composer.json             # PHP dependencies
    ├── .env.example              # Environment configuration example
    └── symfony.lock              # Symfony dependencies lockfile
```

## 🚀 Run the project locally

### 1. Backend (Symfony)
```
cd task-manager-back/
composer install
cp .env.example .env
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony server:start
```

### Database configuration :

Edit the .env file and update your database credentials :
```
DATABASE_URL="postgresql://user:password@127.0.0.1:5432/taskr"
```

### Generate JWT keys :
```
mkdir -p config/jwt
openssl genrsa -out config/jwt/private.pem -aes256 4096
openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```

Then add the passphrase to your .env if needed :

```
JWT_PASSPHRASE=ta-passphrase
```

### Database initialization :

```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

### Start the server : 

```
symfony server:start
```


## 2. Frontend (Angular)
```
cd task-manager-front/
npm install
ng serve
```


#📦 Features

- ✅ JWT authentication

- ✅ Task listing by user (CRUD)

- ✅  Responsive user interface

# 🔐 Sécurité

Sensitive files like .env, JWT keys (private.pem, public.pem), vendor/, and var/ are excluded from the repository using .gitignore.

# 🧑‍💻 Development

This project is actively under development.

Feel free to contribute or reach out!

📧 Email: alexis.callet@free.fr

🔗 LinkedIn: Alexis Callet
