const express = require('express');
const router = express.Router();

const Book = require('../models/Book');


// route post - enregistre un livre
router.post('/', );

 

  // modification d'un livre
  router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  // route suppression un livre
  router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

  // route get pour répondre à un endpoint précis - un seul livre
  router.get('/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

   // récupération des données - tout les livres
   router.get('/', (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
  });

  // récupération livres
  router.get('/', (req, res, next) => {
    const books = [
      {
        userId: 'ijididddd',
        title: 'Il était une fois à Safi',
        author: 'Ghandi Sarah',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        year: 2023,
        genre: 'autobiographie, romance',
        ratings: [
            {
            userId: 'eddde',
            grade: 4,
            }
        ],
        averageRating: 2,
    },
    ];
    res.status(200).json(books);
  });


module.exports = router;