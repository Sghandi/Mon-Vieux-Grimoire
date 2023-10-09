const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');

// environment variable to protect the Database
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;


const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

// Connexion to the Database MongoDB
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.ej433a1.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

//CORS (Cross-Origin Resource Sharing) header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/books' , bookRoutes);
  app.use('/api/auth', userRoutes);
  

  module.exports = app;