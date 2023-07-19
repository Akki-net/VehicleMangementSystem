const express = require('express');
const router = express.Router();
const { book, view } = require("../controllers/bManageCtrl");
const { userAuth } = require("../utils/middleware");

router.post('/book_now', userAuth, book);
router.get('/view/:email', view);

module.exports = router;
