const router = require("express").Router();
const booksController = require('../controller/book.controller');

router.post('/', booksController.createBook);

router.get('/', booksController.findAllBooks);
router.get('/:isbn', booksController.findBookByIsbn);

router.put('/:isbn', booksController.updateBookByIsbn);

router.delete('/:isbn', booksController.deleteBookByIsbn);
router.delete('/', booksController.deleteAllBooks);


module.exports = router;