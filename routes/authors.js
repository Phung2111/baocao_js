var express = require('express');
var router = express.Router();
var authorModel = require('../schemas/author')
var ResHelper = require('../helper/ResponseHelper');
const { query } = require('express');

//GET
router.get('/', async function (req, res, next) {
  let authors = await authorModel.find({isDeleted: false}).populate('published')
    .exec();
  ResHelper.RenderRes(res, true, authors)
});



//get detail
router.get('/:id', async function (req, res, next) {
   try {
     let author = await authorModel.find({ _id: req.params.id }).exec();
     ResHelper.RenderRes(res, true, author)
   } catch (error) {
     ResHelper.RenderRes(res, false, error)
   }
});





//create
router.post('/', async function (req, res, next) {
  try {
    var newAuthor = new authorModel({
      name: req.body.name
    })
    await newAuthor.save();
    ResHelper.RenderRes(res, true, newAuthor)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});
//update
router.put('/:id', async function (req, res, next) {
  try {
    let author = await authorModel.findByIdAndUpdate
       (req.params.id, req.body, {
         new: true
       }).exec()
     ResHelper.RenderRes(res, true, author);
   } catch (error) {
     ResHelper.RenderRes(res, false, error)
  }
 });

//delete

router.delete('/:id', async function (req, res, next) {
   try {
     let author = await authorModel.findByIdAndUpdate
       (req.params.id, {
         isDeleted: true
       }, {
         new: true
       }).exec()
    ResHelper.RenderRes(res, true, author);
   } catch (error) {
     ResHelper.RenderRes(res, false, error)
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
