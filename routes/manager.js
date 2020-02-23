var express = require('express');
var router = express.Router();

// Require controller modules.
var manager_controller = require('../controllers/managerController');

/// manager ROUTES ///

// GET manager home page.
router.get('/', manager_controller.isManager,manager_controller.index);

// GET request for creating a manager. NOTE This must come before routes that display manager (uses id).
router.get('/create', manager_controller.isManager, manager_controller.manager_create_get);

// POST request for creating manager.
router.post('/create', manager_controller.isManager, manager_controller.manager_create_post);

// GET request to delete manager.
router.get('/:id/delete', manager_controller.isManager, manager_controller.manager_delete_get);

// POST request to delete manager.
router.post('/:id/delete', manager_controller.isManager, manager_controller.manager_delete_post);

// GET request to update manager.
router.get('/:id/update', manager_controller.isManager, manager_controller.manager_update_get);

// POST request to update manager.
router.post('/:id/update', manager_controller.isManager, manager_controller.manager_update_post);

// GET request for one manager.
router.get('/:id', manager_controller.isManager, manager_controller.manager_detail);

// GET request for list of all manager items.
router.get('/all', manager_controller.isManager, manager_controller.manager_list);

module.exports = router;