const express = require('express');
const router = express.Router();
const { add, update, remove } = require("../controllers/cManageCtrl");

router.post('/add', add);
router.post('/update', update);
router.get('/delete/:model', remove);

module.exports = router;
