const express = require('express');
const router = express.Router();
const { book, view } = require("../controllers/bManageCtrl");

router.post('/book_now', book);
router.get('/view/:email', view);

module.exports = router;
