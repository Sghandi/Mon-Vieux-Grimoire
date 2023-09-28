const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const Book = require('./models/Book');


const bookRoutes = require('./routes/book');


// conexion base de données
mongoose.connect('mongodb+srv://new-user33:ghandi212@cluster0.ej433a1.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// entete
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/book' , bookRoutes);
  
  module.exports = app;