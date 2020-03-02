var express = require('express');
var router = express.Router();

// Require index controller
var index_controller = require('../controllers/indexController');

// GET main section
router.get('/', index_controller.index);

// GET about section
router.get('/a_propos', index_controller.index_about);

// GET contact section
router.get('/contact', index_controller.index_contact);

// GET our team section
router.get('/notre_equipe', index_controller.index_team);

// GET booking section
router.get('/reservation', index_controller.index_booking);

// GET legal notice section
router.get('/mentions_legales', index_controller.index_legal_notice);

// GET login section
router.get('/connexion', index_controller.index_login_get);

// POST login inputs
router.post('/connexion', index_controller.index_login_post);

// GET register
router.get('/inscription', index_controller.index_register_get);

// POST register inputs
router.post('/inscription', index_controller.index_register_post);

// GET prices section
router.get('/tarifs', index_controller.index_prices);

// GET logout
router.get('/deconnexion', index_controller.index_logout);

module.exports = router;