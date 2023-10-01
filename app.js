const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');


const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

// connexion base de données
mongoose.connect('mongodb+srv://new-user33:<password>@cluster0.ej433a1.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// entete gestion des CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/books' , bookRoutes);
  app.use('/api/auth', userRoutes);

  module.exports = app;