var Index = require('../models/index');

// Display list of all campeur.
exports.index = function(req, res) {
    res.render('index.ejs',{title : "Camping des sources"})
};

// Display list of all campeur.
exports.index_a_propos = function(req, res) {
    res.send('NOT IMPLEMENTED: a propos');
};

// Display list of all campeur.
exports.index_reservation = function(req, res) {
    res.send('NOT IMPLEMENTED: reservation');
};

// Display list of all campeur.
exports.index_notre_equipe = function(req, res) {
    res.send('NOT IMPLEMENTED: notre equipe');
};

// Display list of all campeur.
exports.index_contact = function(req, res) {
    res.send('NOT IMPLEMENTED: contact');
};

// Display list of all campeur.
exports.index_mentions_legales = function(req, res) {
    res.send('NOT IMPLEMENTED: mentions legales');
};

// Display campeur create form on GET.
exports.index_connexion_get = function(req, res) {
    res.send('NOT IMPLEMENTED: get page connexion');
};

// Handle campeur create on POST.
exports.index_connexion_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post page connexion');
};

// Display campeur delete form on GET.
exports.index_inscription_get = function(req, res) {
    res.send('NOT IMPLEMENTED: get page inscription');
};

// Handle campeur delete on POST.
exports.index_inscription_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post page inscription');
};

// Display campeur update form on GET.
exports.index_tarifs_get = function(req, res) {
    res.send('NOT IMPLEMENTED: get page tarifs');
};

// Handle campeur update on POST.
exports.index_tarifs_post = function(req, res) {
    res.send('NOT IMPLEMENTED:post page tarifs');
};