var express = require('express');
var router = express.Router();
var authorModel = require('../schemas/author')
var ResHelper = require('../helper/ResponseHelper');
const { query } = require('express');

// GET
router.get('/create', async function (req, res, next) {
    res.render('authors/create', { message: '' });
});
/*router.get('/detail', async function (req, res, next) {
    res.render('authors/detail', { message: '' });
});
*/
router.get('/detail/:id', async function (req, res, next) {
    try {
        let author = await authorModel.findById(req.params.id).exec();
        if (!author) {
            throw new Error("Author not found");
        }
        res.render('authors/detail', { author: author });
    } catch (error) {
        res.status(404).send("Author not found");
    }
});
/*
router.get('/update/:id', async function (req, res, next) {
    try {
        let author = await authorModel.findById(req.params.id).exec();
        if (!author) {
            throw new Error("Author not found");
        }
        res.render('authors/update', { author: author });
    } catch (error) {
        res.status(404).send("Author not found");
    }
});
*/
// GET update page
router.get('/update/:id', async function (req, res, next) {
    try {
        let author = await authorModel.findById(req.params.id);
        res.render('authors/update', { author: author });
    } catch (error) {
        ResHelper.RenderRes(res, false, error);
    }
});
// POST update author
router.post('/update/:id', async function (req, res, next) {
    try {
        let updatedAuthor = await authorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Redirect back to the index page after successful update
        res.redirect('/authors/index');
    } catch (error) {
        ResHelper.RenderRes(res, false, error);
    }
});





router.get('/index', async function (req, res, next) {
    try {
        let authors = await authorModel.find({ isDeleted: false }).populate('published').exec();
        res.render('authors/index', { authors: authors });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'An error occurred', error: error });
    }
});

router.post('/delete/:id', async function (req, res, next) {
    try {
        let deletedAuthor = await authorModel.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            return res.status(404).send("Author not found");
        }
        // Redirect back to the index page after successful deletion
        res.redirect('/authors/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting author");
    }
});


module.exports = router;