var express = require('express')
var router = express.Router()


// Require staff controller
var staff_controller = require('../controllers/staffController')

//Middleware
router.use(staff_controller.is_staff)

// GET staff main page
router.get('/',staff_controller.staff_index);

// GET reports
router.get('/incidents',staff_controller.staff_reports);

// GET delete report by :id
router.get('/incident/:id/delete',staff_controller.staff_report_delete);

// GET current campers
router.get('/campeurs',staff_controller.staff_campers);

// GET camper by :id
router.get('/campeur/:id',staff_controller.staff_camper);

// GET all campers
router.get('/campeurs/all',staff_controller.staff_all_campers);

// GET arrivals
router.get('/arrivees',staff_controller.staff_arrivals);

// GET checkin
router.get('/arrivees/:id',staff_controller.staff_checkin);

// GET departures
router.get('/departs',staff_controller.staff_departures);

// GET checkout
router.get('/departs/:id',staff_controller.staff_checkout);

// GET interactive plan
router.get('/plan',staff_controller.staff_plan);

// GET location informations from :id
router.get('/emplacement/:id',staff_controller.staff_location);

// GET check infrastructure section
router.get('/pointage',staff_controller.staff_check_get);

// GET check infrastructure by :id
router.get('/pointage/:id',staff_controller.staff_check_post);

module.exports = router;