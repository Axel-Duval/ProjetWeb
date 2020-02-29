var express = require('express');
var router = express.Router();

// Require controller modules.
var personnel_controller = require('../controllers/personnelController');

/// personnel ROUTES ///

// GET personnel home page.
router.get('/', personnel_controller.isPersonnel,personnel_controller.index);

// GET incidents
router.get('/incidents', personnel_controller.isPersonnel, personnel_controller.personnel_incidents);

// GET delete incident
router.get('/incident/:id/delete', personnel_controller.isPersonnel, personnel_controller.personnel_incident_delete_id);

// GET actual campeurs
router.get('/campeurs', personnel_controller.isPersonnel, personnel_controller.personnel_campeurs);

// GET actual campeurs
router.get('/campeur/:id', personnel_controller.isPersonnel, personnel_controller.personnel_campeur_id);

module.exports = router;