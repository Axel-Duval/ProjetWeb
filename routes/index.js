var express = require('express');
var router = express.Router();

// Require index  and camper controller
var index_controller = require('../controllers/indexController');
var camper_controller = require('../controllers/camperController');

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

//GET reinit password
router.get('/reinitialisation_mot_de_passe', index_controller.index_forgot_password);

//POST reinit password
router.post('/reinitialisation_mot_de_passe', index_controller.index_send_mail_token);

// GET booking from location and dates
router.get('/reservation/:id_location/:arrival/:departure', camper_controller.camper_is_camper ,index_controller.index_booking_location);

//GET reinit password
router.get('/token_connexion/:head/:token', index_controller.index_token_connexion);

module.exports = router;