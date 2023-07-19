require('dotenv').config();
var express = require('express');
var router = express.Router();
var Admin = require("../models/Admin");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createAdmin', async (req, res) => {
  const saltRounds = 10
  const hashPass = await bcrypt.hash(req.body.password, saltRounds);
  await Admin.create({username: req.body.username, hashPass});
  res.send("admin is created");
})

router.post('/adminLogin', async (req, res) => {
  const { username, password } = req.body

  const user = await Admin.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.hashPass)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const adminForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(adminForToken, process.env.SECRET)

  res
    .status(200)
    .send({ token, username: user.username })
})

module.exports = router;
