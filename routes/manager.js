var express = require('express');
var router = express.Router();

// Require controller modules.
var manager_controller = require('../controllers/managerController');

/// manager ROUTES ///

// GET manager home page.
router.get('/', manager_controller.isManager,manager_controller.index);

// GET request for list of all manager items.
router.get('/personnel', manager_controller.isManager, manager_controller.personnel_list);

// GET request to get the form
router.get('/personnel/create', manager_controller.isManager, manager_controller.create_personnel_get);

// POST to create a personnel
router.post('/personnel/create', manager_controller.isManager, manager_controller.create_personnel_post);

// GET personnel by id
router.get('/personnel/:id', manager_controller.isManager, manager_controller.manager_personnel_id);

// POST update personnel infos
router.post('/personnel/:id', manager_controller.isManager, manager_controller.manager_update_personnel);

// GET delete personnel from id
router.get('/personnel/:id/delete', manager_controller.isManager, manager_controller.manager_delete_personnel);

module.exports = router;