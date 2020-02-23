var express = require('express');
var router = express.Router();

// Require controller modules.
var campeur_controller = require('../controllers/campeurController');

/// CAMPEUR ROUTES ///

// GET campeur home page.
router.get('/', campeur_controller.isCampeur,campeur_controller.index);

// GET request for creating a campeur. NOTE This must come before routes that display campeur (uses id).
router.get('/create', campeur_controller.isCampeur, campeur_controller.campeur_create_get);

// POST request for creating campeur.
router.post('/create', campeur_controller.isCampeur, campeur_controller.campeur_create_post);

// GET request to delete campeur.
router.get('/:id/delete', campeur_controller.isCampeur, campeur_controller.campeur_delete_get);

// POST request to delete campeur.
router.post('/:id/delete', campeur_controller.isCampeur, campeur_controller.campeur_delete_post);

// GET request to update campeur.
router.get('/:id/update', campeur_controller.isCampeur, campeur_controller.campeur_update_get);

// POST request to update campeur.
router.post('/:id/update', campeur_controller.isCampeur, campeur_controller.campeur_update_post);

// GET request for one campeur.
router.get('/:id', campeur_controller.isCampeur, campeur_controller.campeur_detail);

// GET request for list of all campeur items.
router.get('/all', campeur_controller.isCampeur, campeur_controller.campeur_list);

module.exports = router;