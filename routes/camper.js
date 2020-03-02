var express = require('express');
var router = express.Router();

// Require camper controller
var camper_controller = require('../controllers/camperController');

//Middleware
router.use(camper_controller.camper_is_camper);

// GET camper home page (bookings)
router.get('/',camper_controller.camper_bookings);

// GET booking by :id
router.get('/reservation/:id',camper_controller.camper_see_booking,camper_controller.camper_booking);

// GET report section
router.get('/signaler',camper_controller.camper_report_get);

// POST report inputs
router.post('/signaler',camper_controller.camper_report_post);

// GET account section
router.get('/compte',camper_controller.camper_account_get);

// POST account inputs
router.post('/compte',camper_controller.camper_account_post);

module.exports = router;