# Étape 1 : Utiliser Node officiel
FROM node:20-alpine

# Étape 2 : Créer un dossier d'app
WORKDIR /app

# Étape 3 : Copier les fichiers
COPY package*.json ./
RUN npm install --production

COPY . .

# Étape 4 : Exposer le port du serveur
EXPOSE 4000

# Étape 5 : Lancer le serveur
CMD ["npm", "start"]
