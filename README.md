# Voyage dans les Musées Perdus  
> 🎨 Projet Workshop M1 EPSI Nantes 2025  
> 🌍 Thème : Art créatif & Tourisme  

---

## 🧩 Contexte du projet

Ce backend alimente l’escape game coopératif **Voyage dans les Musées Perdus**, une expérience interactive où deux joueurs — un **Agent** et un **Opérateur** — collaborent à distance pour restaurer trois musées (Paris, New York, Tokyo).

Ce serveur gère :
- la **création et la synchronisation des sessions de jeu**,
- la **communication en temps réel** (Socket.io),
- la **sauvegarde des progressions et scores** dans **MariaDB**,
- la **journalisation (logs)** de tous les événements importants,
- et la **documentation Swagger** pour tester l’API facilement.

---

## ⚙️ Stack technique

| Composant | Technologie |
|------------|-------------|
| Serveur web | **Node.js + Express** |
| Base de données | **MariaDB** |
| Communication temps réel | **Socket.io** |
| Documentation API | **Swagger (swagger-ui-express + swagger-jsdoc)** |
| Sécurité | **CORS + dotenv** |
| Logs | Table SQL + console |
| Style de code | Modules ES (`import` / `export`) |

---

## 🧱 Architecture du projet

```

/backend
├── src/
│   ├── app.js                  # Configuration Express + routes
│   ├── socket.js               # Événements Socket.io
│   ├── database.js             # Connexion MariaDB
│   ├── swagger.js              # Documentation Swagger
│   ├── utils/
│   │   ├── generateCode.js     # Générateur de code de session
│   │   └── logger.js           # Gestion centralisée des logs
│   ├── routes/
│   │   ├── session.routes.js   # Création / Connexion / Récupération
│   │   ├── progress.routes.js  # Suivi des villes terminées
│   │   └── chat.routes.js      # Enregistrement des messages
│   ├── controllers/
│   │   ├── session.controller.js
│   │   ├── progress.controller.js
│   │   └── chat.controller.js
│   ├── models/
│   │   ├── SessionModel.js
│   │   ├── ScoreModel.js
│   │   └── LogModel.js
│   └── data/
│       └── queries.sql         # Script SQL pour MariaDB
│
├── .env                        # Variables d’environnement
├── package.json
└── server.js                   # Point d’entrée du serveur

````

---

## 🧾 Base de données MariaDB

### 1️⃣ Script SQL (`/src/data/queries.sql`)
```sql
CREATE DATABASE IF NOT EXISTS escape_musee;
USE escape_musee;

CREATE TABLE sessions (
  id VARCHAR(10) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completedCities JSON,
  codes JSON
);

CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(10),
  total_time INT,
  points INT,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(10),
  type ENUM('connection', 'enigma', 'progress', 'chat'),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
````

---

## 🔐 Variables d’environnement (`.env`)

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=escape_musee
```

---

## 🧠 Fonctionnalités principales

| Fonction                  | Description                                       |
| ------------------------- | ------------------------------------------------- |
| 🧩 **Sessions**           | Création, connexion et récupération d’une session |
| 💬 **Chat en temps réel** | Communication instantanée via Socket.io           |
| 🏆 **Progression**        | Suivi des villes terminées et des codes débloqués |
| 🧾 **Scores**             | Sauvegarde du score final et du temps total       |
| 🕵️ **Logs**              | Historique complet (connexions, énigmes, chat)    |
| 📘 **Swagger UI**         | Documentation et test des endpoints REST          |

---

## 📡 API REST — Endpoints principaux

| Méthode | Endpoint               | Description                              |
| ------- | ---------------------- | ---------------------------------------- |
| `POST`  | `/api/session/create`  | Crée une nouvelle session de jeu         |
| `POST`  | `/api/session/join`    | Rejoint une session existante            |
| `GET`   | `/api/session/:id`     | Récupère les infos d’une session         |
| `POST`  | `/api/progress/update` | Met à jour la progression (ville + code) |
| `POST`  | `/api/chat/log`        | Enregistre un message dans les logs      |

---

## ⚡ WebSocket – Événements disponibles

| Événement          | Émetteur          | Action                              |
| ------------------ | ----------------- | ----------------------------------- |
| `join_room`        | Agent / Opérateur | Rejoint une room Socket.io          |
| `player_joined`    | Serveur → Tous    | Notifie qu’un joueur a rejoint      |
| `send_message`     | Joueur            | Envoie un message dans le chat      |
| `receive_message`  | Serveur → Tous    | Reçoit un message en temps réel     |
| `validate_enigma`  | Agent             | Confirme la résolution d’une énigme |
| `enigma_validated` | Serveur → Tous    | Diffuse la validation               |
| `disconnect`       | Serveur           | Log de déconnexion                  |

---

## 📖 Swagger – Documentation interactive

Le projet inclut une documentation interactive via **Swagger UI** :

* Disponible sur 👉 [http://localhost:4000/api-docs](http://localhost:4000/api-docs)
* Permet de tester chaque route directement dans le navigateur.
* Chaque route contient un exemple JSON et un résumé.

📂 Fichier principal : `src/swagger.js`
Les définitions sont basées sur les commentaires JSDoc des fichiers `routes/*.js`.

---

## 🪵 Gestion des logs

Tous les événements importants (connexion, chat, énigmes, progression) sont :

* sauvegardés dans la table `logs` de **MariaDB** ;
* affichés dans la console pour le debug ;
* accessibles via un futur endpoint `/api/logs` (optionnel à implémenter).

📁 Source : `src/utils/logger.js`

---

## 🧠 Exemple de flux complet

1️⃣ L’**opérateur** crée une session → `/api/session/create`
2️⃣ L’**agent** rejoint avec le code → `/api/session/join`
3️⃣ Les deux joueurs sont connectés via **Socket.io**
4️⃣ Ils communiquent (chat + énigmes temps réel)
5️⃣ Quand une ville est finie → `/api/progress/update`
6️⃣ Tous les événements sont enregistrés dans **MariaDB (logs)**
7️⃣ Fin du jeu → sauvegarde du **score final**

---

## ⚙️ Installation locale

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/D-Seonay/back-workshop-I1.git
cd back-workshop-I1
```

### 2️⃣ Installer les dépendances

```bash
npm install
```bash
npm install
```

### 3️⃣ Lancer le serveur

```bash
npm run start
```

### 4️⃣ Accéder à l’API

```
http://localhost:4000/api/session/create
```

### 5️⃣ Accéder à la documentation Swagger

```
http://localhost:4000/api-docs
```

---

## 🧰 Scripts disponibles

| Script                       | Description                     |
| ---------------------------- | ------------------------------- |
| `npm run start`              | Lance le serveur Express        |

---