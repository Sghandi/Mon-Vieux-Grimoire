const { error } = require('console');
const Book = require('../models/Book');
const fs = require('fs');


// Afficher tout les livres
exports.getAllBook = (req, res, next) => {
  Book.find().then(
    (books) => {
      res.status(200).json(books);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// création d'un livre
exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  book.save()
  .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};


// Afficher un livre
  exports.getOneBook = (req, res, next) => {
    Book.findOne({
      _id: req.params.id
    }).then(
      (book) => {
        res.status(200).json(book);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  // Modifier un livre
  exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };


// Supprimer un livre
 exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
      .then(book => {
          if (book.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = book.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Book.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};



// Note moyenne d'un livre
exports.ratingBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      book.ratings.push({
        userId: req.auth.userId,
        grade: req.body.rating
      });

      let totalRating = book.ratings.reduce((acc, rating) => acc + rating.grade, 0);

      // Calcul de la moyenne
      book.averageRating = totalRating / book.ratings.length;
      console.log(book.averageRating);

      return book.save();
    })
    .then(book => {
      res.json(book);
    })
    .catch(err => {
      res.status(401).json({ err });
    });
};

// Tableau 3 meilleurs livres
exports.getBestRatingBooks = (req, res, next) => {
  Book.find()
  .then(books => {
    books.sort((a,b) =>b.averageRating - a.averageRating);
    const bestRatedBooks = books.slice(0,3);

    res.status(200).json(bestRatedBooks)})
    .catch(error =>
      res.status(404).json ({error}))
  };

