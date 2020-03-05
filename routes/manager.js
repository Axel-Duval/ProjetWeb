var express = require('express');
var router = express.Router();

// Require manager controller
var manager_controller = require('../controllers/managerController');

//Middlewares
router.use(manager_controller.is_manager);

// GET manager home page
router.get('/',manager_controller.manager_index);

// GET staff section
router.get('/personnel',manager_controller.manager_all_staff);

// GET new staff member form
router.get('/personnel/create',manager_controller.manager_create_staff_get);

// POST create new staff member
router.post('/personnel/create',manager_controller.manager_create_staff_post);

// GET staff by :id
router.get('/personnel/:id',manager_controller.manager_staff);

// POST update staff infos
router.post('/personnel/:id',manager_controller.manager_update_staff);

// DELETE staff member by :id
router.get('/personnel/:id/delete',manager_controller.manager_delete_staff);

// GET report section
router.get('/incidents',manager_controller.manager_all_reports);

// GET delete report by :id
router.get('/incident/:id/delete',manager_controller.manager_delete_report);

module.exports = router;