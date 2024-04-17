var express = require('express');
var router = express.Router();
var userModel = require('../schemas/user')
var ResHelper = require('../helper/ResponseHelper');
const { query } = require('express');

// GET
router.get('/login', async function (req, res, next) {
    res.render('users/login', { message: '' });
});

router.get('/register', async function (req, res, next) {
    res.render('users/register', { message: '' });
});

router.get('/forgot-password', async function (req, res, next) {
    res.render('users/forgotPassword', { message: '' });
});

router.get('/reset-password', async function (req, res, next) {
    res.render('users/resetPassword', { token: '', timestamp : '' });
});

router.get('/index', async function (req, res, next) {
    try {
        let users = await userModel.find({}); // Lấy danh sách tất cả người dùng từ cơ sở dữ liệu
        res.render('users/index', { users: users }); // Trả về trang index với danh sách người dùng được render
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'An error occurred', error: error }); // Trả về trang lỗi nếu có lỗi xảy ra
    }
});
// Route GET cho trang tạo người dùng
router.get('/create', async function (req, res, next) {
    res.render('users/create', { message: '' });
});

// Route GET cho trang chi tiết người dùng
router.get('/detail/:id', async function (req, res, next) {
    try {
        const user = await userModel.findById(req.params.id).exec();
        if (!user) {
            throw new Error("User not found");
        }
        res.render('users/detail', { user: user });
    } catch (error) {
        res.status(404).send("User not found");
    }
});

// Route GET cho trang cập nhật thông tin người dùng
router.get('/update/:id', async function (req, res, next) {
    try {
        let user = await userModel.findById(req.params.id); // Tìm người dùng cần cập nhật dựa vào ID
        res.render('users/update', { user: user }); // Render trang cập nhật thông tin người dùng với dữ liệu của người dùng đã tìm được
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'An error occurred', error: error }); // Trả về trang lỗi nếu có lỗi xảy ra
    }
});

// Route POST để cập nhật thông tin người dùng
router.post('/update/:id', async function (req, res, next) {
    try {
        let updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Cập nhật thông tin của người dùng dựa vào ID
        // Sau khi cập nhật thành công, chuyển hướng về trang chi tiết người dùng
        res.redirect(`/users/detail/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'An error occurred', error: error }); // Trả về trang lỗi nếu có lỗi xảy ra
    }
});

// Route POST để xóa người dùng
router.post('/delete/:id', async function (req, res, next) {
    try {
        let deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        // Chuyển hướng trở lại trang danh sách người dùng sau khi xóa thành công
        res.redirect('/users/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user");
    }
});



module.exports = router;