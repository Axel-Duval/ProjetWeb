var express = require('express')
var router = express.Router()

// Require controller modules.
var campeur_controller = require('../controllers/campeurController')

/// CAMPEUR ROUTES ///

// GET campeur home page.
router.get('/', campeur_controller.isCampeur,campeur_controller.campeur_reservations)

// GET campeur home page.
router.get('/reservation/:id', campeur_controller.isCampeur,campeur_controller.canAccessReservation,campeur_controller.campeur_reservation_id)

// GET signaler page
router.get('/signaler', campeur_controller.isCampeur,campeur_controller.campeur_signaler_get)

// POST signaler page
router.post('/signaler', campeur_controller.isCampeur,campeur_controller.campeur_signaler_post)

// GET signaler page
router.get('/compte', campeur_controller.isCampeur,campeur_controller.campeur_compte_get)

// POST modification account
router.post('/compte', campeur_controller.isCampeur,campeur_controller.campeur_compte_post)

module.exports = router;