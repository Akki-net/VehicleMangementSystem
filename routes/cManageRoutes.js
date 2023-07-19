const express = require('express');
const router = express.Router();
const { add, update, remove } = require("../controllers/cManageCtrl");
const { adminAuth } = require("../utils/middleware");

router.post('/add', adminAuth, add);
router.post('/update', adminAuth, update);
router.get('/delete/:model', adminAuth, remove);

module.exports = router;
