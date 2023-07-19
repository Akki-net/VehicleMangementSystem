const express = require('express');
const router = express.Router();
const { vehicleStat, avgRentalDuration } = require("../controllers/rentalStatCtrl");

router.get('/vehicleStat', vehicleStat);
router.get('/avgRentalDuration', avgRentalDuration)

module.exports = router;