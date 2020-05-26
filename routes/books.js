var express = require('express');
var router = express.Router();
let Book = require('../models').Book;
const asyncHandler = require('express-async-handler');

/* GET all books */
router.get('/', asyncHandler(async (req, res) => {
  let books = await Book.findAll();
  res.render('index', {books});
}));

// render new book form
router.get('/new', (req, res) => {
  res.send('new-book');
});

router.get('/:id', asyncHandler(async (req, res) => {
  let books = await Book.findAll();
  console.log(books.map(book => book.toJSON()));
  res.send('respond with a resource');
}));

router.post('/new', asyncHandler(async (req, res) => {
  let books = await Book.findAll();
  console.log(books.map(book => book.toJSON()));
  res.send('respond with a resource');
}));

router.post('/:id', asyncHandler(async (req, res) => {
  let books = await Book.findAll();
  console.log(books.map(book => book.toJSON()));
  res.send('respond with a resource');
}));
router.get('/:id/delete', asyncHandler(async (req, res) => {
  let books = await Book.findAll();
  console.log(books.map(book => book.toJSON()));
  res.send('respond with a resource');
}));

module.exports = router;
