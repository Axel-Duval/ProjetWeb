var Index = require('../models/index');
var ft = require("../functions");
var constants = require("../constants");

// Display page principale
exports.index = function(req, res) {
    res.render('index/index',{title : "Camping des sources"})
};

// Display a propos
exports.index_a_propos = function(req, res) {
    res.send('NOT IMPLEMENTED: a propos');
};

// Display reservation
exports.index_reservation = function(req, res) {
    res.send('NOT IMPLEMENTED: reservation');
};

// Display notre equipe
exports.index_notre_equipe = function(req, res) {
    res.send('NOT IMPLEMENTED: notre equipe');
};

// Display contact
exports.index_contact = function(req, res) {
    res.send('NOT IMPLEMENTED: contact');
};

// Display mentions legales
exports.index_mentions_legales = function(req, res) {
    res.send('NOT IMPLEMENTED: mentions legales');
};

// Display connexion GET
exports.index_connexion_get = function(req, res) {
    var flash = ft.getFlash(req)
    ft.setFlash(res,'success','bravo')
    res.render('index/connexion',{title : "CDS | Connexion",flash})
};

// Handle connexion POST
exports.index_connexion_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post page connexion');
};

// Display inscription GET
exports.index_inscription_get = function(req, res) {
    res.render('index/inscription',{title : "CDS | Inscription"})
};

// Handle inscription POST
exports.index_inscription_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post page inscription');
};

// Display tarifs GET
exports.index_tarifs_get = function(req, res) {
    res.render('index/tarifs',{title : "CDS | tarifs"})
};