var express = require('express');
var router = express.Router();
var studentModel = require('../schemas/student'); // Import mô hình Student từ file schemas/student.js
var ResHelper = require('../helper/ResponseHelper');

// GET danh sách sinh viên
router.get('/index', async function (req, res, next) {
    try {
        let students = await studentModel.find({}); // Lấy danh sách tất cả sinh viên từ cơ sở dữ liệu
        res.render('students/index', { students: students }); // Trả về trang index với danh sách sinh viên được render
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'An error occurred', error: error }); // Trả về trang lỗi nếu có lỗi xảy ra
    }
});

router.get('/create', async function (req, res, next) {
    res.render('students/create', { message: '' });
});



router.get('/detail/:id', async function (req, res, next) {
    try {
        const student = await studentModel.findById(req.params.id).exec();
        if (!student) {
            throw new Error("Student not found");
        }
        res.render('students/detail', { student: student });
    } catch (error) {
        res.status(404).send("Student not found");
    }
});

// GET trang cập nhật thông tin sinh viên
router.get('/update/:id', async function (req, res, next) {
    try {
        let student = await studentModel.findById(req.params.id); // Tìm sinh viên cần cập nhật dựa vào ID
        res.render('students/update', { student: student }); // Render trang cập nhật thông tin sinh viên với dữ liệu của sinh viên đã tìm được
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'An error occurred', error: error }); // Trả về trang lỗi nếu có lỗi xảy ra
    }
});

// POST cập nhật thông tin sinh viên
router.post('/update/:id', async function (req, res, next) {
    try {
        let updatedStudent = await studentModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Cập nhật thông tin của sinh viên dựa vào ID
        // Sau khi cập nhật thành công, chuyển hướng về trang danh sách sinh viên
        res.redirect('/students/index');
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'An error occurred', error: error }); // Trả về trang lỗi nếu có lỗi xảy ra
    }
});








// DELETE book
router.post('/delete/:id', async function (req, res, next) {
    try {
        let deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).send("Student not found");
        }
        // Redirect back to the index page after successful deletion
        res.redirect('/students/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting student");
    }
});

module.exports = router;
