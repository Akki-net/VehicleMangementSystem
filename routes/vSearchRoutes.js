const express = require('express');
const router = express.Router();
const { search, filter } = require("../controllers/vSearchCtrl");

router.get("/query", search);
router.get("/filter", filter);

module.exports = router;