var Index = require('../models/index');

// Display list of all campeur.
exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: main page');
};

// Display detail page for a specific campeur.
exports.campeur_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur detail: ' + req.params.id);
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