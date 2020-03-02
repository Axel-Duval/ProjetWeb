var express = require('express');
var router = express.Router();

// Require manager controller
var manager_controller = require('../controllers/managerController');

// GET manager home page
router.get('/', manager_controller.isManager,manager_controller.index);

// GET staff section
router.get('/personnel', manager_controller.isManager, manager_controller.personnel_list);

// GET new staff member form
router.get('/personnel/create', manager_controller.isManager, manager_controller.create_personnel_get);

// POST create new staff member
router.post('/personnel/create', manager_controller.isManager, manager_controller.create_personnel_post);

// GET staff by :id
router.get('/personnel/:id', manager_controller.isManager, manager_controller.manager_personnel_id);

// POST update staff infos
router.post('/personnel/:id', manager_controller.isManager, manager_controller.manager_update_personnel);

// GET delete staff member by :id
router.get('/personnel/:id/delete', manager_controller.isManager, manager_controller.manager_delete_personnel);

// GET report section
router.get('/incidents', manager_controller.isManager, manager_controller.manager_incidents);

// GET delete report by :id
router.get('/incident/:id/delete', manager_controller.isManager, manager_controller.manager_incident_delete_id);

module.exports = router;