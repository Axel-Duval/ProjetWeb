var express = require('express')
var router = express.Router()

// Require controller modules.
var personnel_controller = require('../controllers/personnelController')

// GET personnel home page.
router.get('/', personnel_controller.isPersonnel,personnel_controller.index)

// GET incidents
router.get('/incidents', personnel_controller.isPersonnel, personnel_controller.personnel_incidents)

// GET delete incident
router.get('/incident/:id/delete', personnel_controller.isPersonnel, personnel_controller.personnel_incident_delete_id)

// GET actual campeurs
router.get('/campeurs', personnel_controller.isPersonnel, personnel_controller.personnel_campeurs)

// GET campeur from id
router.get('/campeur/:id', personnel_controller.isPersonnel, personnel_controller.personnel_campeur_id)

// GET campeur from id
router.get('/campeurs/all', personnel_controller.isPersonnel, personnel_controller.personnel_campeurs_all)

// GET arrivals
router.get('/arrivees', personnel_controller.isPersonnel, personnel_controller.personnel_arrivees)

// GET checkin
router.get('/arrivees/:id', personnel_controller.isPersonnel, personnel_controller.personnel_arrivees_checkin)

// GET departures
router.get('/departs', personnel_controller.isPersonnel, personnel_controller.personnel_departs)

// GET checkout
router.get('/departs/:id', personnel_controller.isPersonnel, personnel_controller.personnel_departs_checkout)

// GET interactive plan
router.get('/plan', personnel_controller.isPersonnel, personnel_controller.personnel_plan_interactif)

// GET emplacement informations from id
router.get('/emplacement/:id', personnel_controller.isPersonnel, personnel_controller.personnel_emplacement_id)

module.exports = router