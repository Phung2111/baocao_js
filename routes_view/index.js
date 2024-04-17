var express = require('express');
var router = express.Router();

router.use('/users',require('./users'));
router.use('/authors',require('./authors'));
router.use('/books',require('./books'));
router.use('/students',require('./students'));
module.exports = router;
