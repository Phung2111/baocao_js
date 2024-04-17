var express = require('express');
var router = express.Router();
var bookModel = require('../schemas/book');
var ResHelper = require('../helper/ResponseHelper');

router.get('/index', async function (req, res, next) {
    try {
        let books = await bookModel.find({}).populate('author').exec();
        res.render('books/index', { books: books });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'An error occurred', error: error });
    }
});


router.get('/create', async function (req, res, next) {
    res.render('books/create', { message: '' });
});




router.get('/detail/:id', async function (req, res, next) {
    try {
        const book = await bookModel.findById(req.params.id).exec();
        if (!book) {
            throw new Error("Book not found");
        }
        res.render('books/detail', { book: book });
    } catch (error) {
        res.status(404).send("Book not found");
    }
});



router.get('/update/:id', async function (req, res, next) {
    try {
        let book = await bookModel.findById(req.params.id);
        res.render('books/update', { book: book });
    } catch (error) {
        ResHelper.RenderRes(res, false, error);
    }
});

// POST update book
router.post('/update/:id', async function (req, res, next) {
    try {
        let updatedBook = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Redirect back to the index page after successful update
        res.redirect('/books/index');
    } catch (error) {
        ResHelper.RenderRes(res, false, error);
    }
});


// DELETE book
router.post('/delete/:id', async function (req, res, next) {
    try {
        let deletedBook = await bookModel.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).send("Book not found");
        }
        // Redirect back to the index page after successful deletion
        res.redirect('/books/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting book");
    }
});

module.exports = router;
