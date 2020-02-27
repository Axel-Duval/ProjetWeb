var express = require('express');
var router = express.Router();

// Require controller modules.
var campeur_controller = require('../controllers/campeurController');

/// CAMPEUR ROUTES ///

// GET campeur home page.
router.get('/', campeur_controller.isCampeur,campeur_controller.index);

module.exports = router;