
var express = require('express');
var router = express.Router();
var studentModel = require('../schemas/student')
var ResHelper = require('../helper/ResponseHelper');
const { query } = require('express');



// GET
router.get('/', async function(req, res, next) {
  let students = await studentModel.find({ isDeleted: false })
    .exec();
  ResHelper.RenderRes(res, true, students)
});
// GET Detail
router.get('/:id', async function(req, res, next) {
  try {
    let student = await studentModel.find({ _id: req.params.id, isDeleted: false }).exec();
    ResHelper.RenderRes(res, true, student)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

// Create
router.post('/', async function(req, res, next) {
  try {
    var newStudent = new studentModel({
      name: req.body.name,
      birthday: req.body.birthday,
   
      isDeteted: req.body.isDeteted
    })
    await newStudent.save();
    ResHelper.RenderRes(res, true, newStudent)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

// Update
router.put('/:id', async function (req, res, next) {
  try {
    let student = await studentModel.findByIdAndUpdate
      (req.params.id, req.body, {
        new: true
      }).exec()
    ResHelper.RenderRes(res, true, student);
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

// DELETE
router.delete('/:id', async function (req, res, next) {
  try {
    let student = await studentModel.findByIdAndUpdate
      (req.params.id, {
        isDeleted: true
      }, {
        new: true
      }).exec()
    ResHelper.RenderRes(res, true, student);
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});





//var books = [{
 // id: 1,
 // name: "tieng viet 1"
//}, {
//  id: 2,
//  name: "tieng viet 2"
//}, {
//  id: 3,
 // name: "tieng viet 3"
//}]

/*
 /books
 /books/id - > get by id
 /book -> post
 /book/id - >put
 /book/id ->delete
 */

/* GET users listing. */
//localhost:3000/books
//router.get('/', function (req, res, next) {
 // let undeleted = books.filter(b => !b.isDeleted )
//  res.send(undeleted);
//});

//localhost:3000/books/add
/*Sử dụng giấy 
Sử dụng hàm built in của array để thực hiện kiểm tra truy vấn 
quyển sách trong mảng books có id là req.param.id
trong tờ giấy ghi Họ Tên + MSSV không xài viết chì +0.5
*/
/*router.get('/:id', function (req, res, next) {
  var book = books.filter(b => b.id == req.params.id)
  if (book.length > 0) {
    res.send(book[0]);
  } else {
    res.status(404).send("id khong hop le");
  }
});

router.post('/', function (req, res, next) {
  let newbook = {
    id: GenID(16),
    name: req.body.name
  }
  books.push(newbook);
  res.send(newbook);
});
router.put('/:id', function (req, res, next) {
  var book = books.find(b => b.id == req.params.id);
  if (book) {
    book.name = req.body.name;
    res.send(book);
  } else {
    res.status(404).send("id khong ton tai");
  }
});

function GenID(length){
  let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(Math.random()*61);
    result+=source[rand];
  }
  return result;
}

router.put('/restore/:id', function (req, res, next) {
  var book = books.find(b => b.id == req.params.id);
  if (book) {
    //book.isDeleted = undefined;
    delete book.isDeleted;
    res.send(book);
  } else {
    res.status(404).send("id khong ton tai");
  }
});

router.delete('/:id', function (req, res, next) {
  var book = books.find(b => b.id == req.params.id);
  if (book) {
    // let index = books.indexOf(book);
    // books.splice(index,1)
    book.isDeleted = true
    res.send(book);
  } else {
    res.status(404).send("id khong ton tai");
  }
});
*/

module.exports = router;
