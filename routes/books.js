var express = require('express');
let paginate = require('express-paginate');
var router = express.Router();
let Book = require('../models').Book;
let {Op} = require('sequelize');
const asyncHandler = require('express-async-handler');

/* GET all books */
router.get('/', asyncHandler(async (req, res) => {
  let books = await Book.findAll();
  res.render('index', {books, title: 'Books'});
}));

// render new book form
router.get('/new', (req, res) => {
  res.render('new-book', {title: 'New Book'});
});

// book detail view
router.get('/:id', asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.id);
  res.render('update-book', {book, title: book.title});
}));

// post new book
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect(`/books`);
  } catch(error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render('form-error', {book, title: 'New Book'})
    } else {
      throw error;
    }
  }
}));

// update book
router.post('/:id', asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect(`/books`);
}));

// delete book
router.post('/:id/delete', asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));

// search results
router.post('/', asyncHandler(async (req, res) => {
  let search = req.body.search;
  let books = await Book.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.substring]: search
          },
        },
        {
          author: {
            [Op.substring]: search
          },
        },
        {
          genre: {
            [Op.substring]: search
          },
        },
        {
          year: search
        }
      ]
    }
  });
  res.render('index', {books, title: 'Books'});
}));

module.exports = router;
