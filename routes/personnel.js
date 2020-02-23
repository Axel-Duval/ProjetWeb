var express = require('express');
var router = express.Router();

// Require controller modules.
var personnel_controller = require('../controllers/personnelController');

/// personnel ROUTES ///

// GET personnel home page.
router.get('/', personnel_controller.isPersonnel,personnel_controller.index);

// GET request for creating a personnel. NOTE This must come before routes that display personnel (uses id).
router.get('/create', personnel_controller.isPersonnel, personnel_controller.personnel_create_get);

// POST request for creating personnel.
router.post('/create', personnel_controller.isPersonnel, personnel_controller.personnel_create_post);

// GET request to delete personnel.
router.get('/:id/delete', personnel_controller.isPersonnel, personnel_controller.personnel_delete_get);

// POST request to delete personnel.
router.post('/:id/delete', personnel_controller.isPersonnel, personnel_controller.personnel_delete_post);

// GET request to update personnel.
router.get('/:id/update', personnel_controller.isPersonnel, personnel_controller.personnel_update_get);

// POST request to update personnel.
router.post('/:id/update', personnel_controller.isPersonnel, personnel_controller.personnel_update_post);

// GET request for one personnel.
router.get('/:id', personnel_controller.isPersonnel, personnel_controller.personnel_detail);

// GET request for list of all personnel items.
router.get('/all', personnel_controller.isPersonnel, personnel_controller.personnel_list);

module.exports = router;