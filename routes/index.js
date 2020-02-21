var express = require('express');
var router = express.Router();

// Require controller modules.
var index_controller = require('../controllers/indexController');

/// index ROUTES ///

// GET index home page.
router.get('/', index_controller.index);

// GET request for get connexion
router.get('/connexion', index_controller.index_connexion_get);

// POST request for connexion
router.post('/connexion', index_controller.index_connexion_post);

// GET request to get inscription
router.get('/inscription', index_controller.index_inscription_get);

// POST request to create inscription
router.post('/inscription', index_controller.index_inscription_post);

// GET request to get tarifs
router.get('/tarifs', index_controller.index_tarifs_get);

// POST request to ...
router.post('/tarifs', index_controller.index_tarifs_post);

module.exports = router;