const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const bookCtrl = require('../controllers/book');


  router.get('/bestrating', bookCtrl.getBestRatingBooks);
  router.get('/', bookCtrl.getAllBook);
  router.get('/:id', bookCtrl.getOneBook);
  router.post('/', auth, multer, bookCtrl.createBook); 
  router.post('/:id/rating', auth, bookCtrl.ratingBook);
  router.put('/:id', auth, multer, bookCtrl.modifyBook);
  router.delete('/:id', auth, bookCtrl.deleteBook);
 

module.exports = router;