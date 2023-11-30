const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour gérer le corps des requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Middleware pour gérer les requêtes CORS (si nécessaire)
// Configuration des options CORS pour permettre les requêtes depuis votre frontend
const corsOptions = {
    origin: 'http://localhost:5173/', // Remplacez ceci par l'URL de votre frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.static('public')); 

// CRUD Produits
app.use('/api/produits', require('./routes/produits.routes'));
app.use('/api/users', require('./routes/users.routes'));


// Stripe
// app.use('/api/stripe', require('./routes/stripe.routes'));

// Tests ci-dessous ---------------------------------------------------------
// app.use('/payment', require('./routes/payment.routes'));    // Version 1
// app.use('/payment2', require('./routes/payment2.routes'));   // Version 2

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});