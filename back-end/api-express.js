const express = require('express');
const cors = require('cors');

const Produits = require('./routes/produits'); // Importez vos routes 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour gérer le corps des requêtes JSON
app.use(express.json());

// Middleware pour gérer les requêtes CORS (si nécessaire)
app.use(cors());

// Utilisation des routes pour les articles
app.use('/api/produits', Produits);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});