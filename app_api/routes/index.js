var express = require('express');
var router = express.Router();

const tripController = require('../controllers/trips');


router
    .route('/trips')
    .get(tripController.tripsList);

router
    .route('/trips/:tripCode')
    .get(tripController.tripsFindCode);

module.exports = router;