const express = require('express');
const manageRouter = express.Router();
const { add, update, remove } = require("../controllers/vManageCtrl");
const { adminAuth } = require("../utils/middleware");

manageRouter.post('/add', adminAuth, add);
manageRouter.post('/update', adminAuth, update);
manageRouter.get('/delete/:model', adminAuth, remove);

module.exports = manageRouter;
