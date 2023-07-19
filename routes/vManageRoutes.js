const express = require('express');
const manageRouter = express.Router();
const { add, update, remove } = require("../controllers/vManageCtrl");

manageRouter.post('/add', add);
manageRouter.post('/update', update);
manageRouter.get('/delete/:model', remove);

module.exports = manageRouter;
