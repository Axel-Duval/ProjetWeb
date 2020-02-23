const Campeur = require('../models/campeur')
const ft = require("../functions")
const constants = require("../constants")
const jwt = require('jsonwebtoken')


// Check if it's a campeur
exports.isCampeur = function(req, res, next) {
    var token = ft.getToken(req)
    jwt.verify(token,constants.SECRET_KEY,(err,auth)=>{
        if(err){
            //401 - UNAUTHORIZED
            res.statusCode = 401;
            res.render('includes/errors.ejs',{title : "CDS | Unauthorized", status : 401, text : "Vous devez vous connecter pour accéder à cette ressource", code : "Non autorisé"})
        }
        else{
            if(auth.mail){
                next()
            }
            else{
                //403 - FORBIDDEN
                res.statusCode = 403
                res.render('includes/errors.ejs',{title : "CDS | Forbidden", status : 403, text : "Vous n'avez pas les droits pour accéder à cette ressource", code : "Accès interdit"})
            }
        }
    })
};

// Display list of all campeur.
exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur index');
};

// Display list of all campeur.
exports.campeur_list = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur list');
};

// Display list of all campeur.
exports.campeur_list = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur list');
};

// Display detail page for a specific campeur.
exports.campeur_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur detail: ' + req.params.id);
};

// Display campeur create form on GET.
exports.campeur_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur create GET');
};

// Handle campeur create on POST.
exports.campeur_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur create POST');
};

// Display campeur delete form on GET.
exports.campeur_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur delete GET');
};

// Handle campeur delete on POST.
exports.campeur_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur delete POST');
};

// Display campeur update form on GET.
exports.campeur_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur update GET');
};

// Handle campeur update on POST.
exports.campeur_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur update POST');
};