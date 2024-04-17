var express = require('express');
var router = express.Router();
var userModel = require('../schemas/user')
var ResHelper = require('../helper/ResponseHelper');
const { query } = require('express');

// GET
router.get('/', async function(req, res, next) {
  let users = await userModel.find({ isDeleted: false })
    .exec();
  ResHelper.RenderRes(res, true, users)
});

// GET Detail
router.get('/:id', async function(req, res, next) {
  try {
    let user = await userModel.find({ _id: req.params.id, isDeleted: false }).exec();
    ResHelper.RenderRes(res, true, user)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

router.post('/login', async (req, res) => {
  try {
    // const username = req.body.username;
    // const password = req.body.password;

    const { username, password } = req.body;
    
    // Tìm kiếm người dùng trong cơ sở dữ liệu
    const user = await userModel.findOne({ username, password }).exec();

    // Kiểm tra thông tin đăng nhập

    if (user) {
      ResHelper.RenderRes(res, true, {})
    } else {
      ResHelper.RenderRes(res, false, {})
    }
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create
router.post('/', async function(req, res, next) {
  try {
    var newUser = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
      isDeteted: req.body.isDeteted
    })
    await newUser.save();
    ResHelper.RenderRes(res, true, newUser)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

// Update
router.put('/:id', async function (req, res, next) {
  try {
    let user = await userModel.findByIdAndUpdate
      (req.params.id, req.body, {
        new: true
      }).exec()
    ResHelper.RenderRes(res, true, user);
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

// DELETE
router.delete('/:id', async function (req, res, next) {
  try {
    let user = await userModel.findByIdAndUpdate
      (req.params.id, {
        isDeleted: true
      }, {
        new: true
      }).exec()
    ResHelper.RenderRes(res, true, user);
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

module.exports = router;
