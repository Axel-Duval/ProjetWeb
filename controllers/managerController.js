const Manager = require('../models/personnel')
const ft = require("../functions")
const constants = require("../constants")
const jwt = require('jsonwebtoken')
const db = require('../models/pool');
const bcrypt = require('bcryptjs')
const Sanitizer = require('express-sanitizer')


// Check if it's a manager
exports.isManager = function(req, res, next) {
    var token = ft.getToken(req)
    jwt.verify(token,constants.SECRET_KEY,(err,auth)=>{
        if(err){
            //401 - UNAUTHORIZED
            res.statusCode = 401;
            res.render('includes/errors.ejs',{title : "CDS | Unauthorized", status : 401, text : "Vous devez vous connecter pour accéder à cette ressource", code : "Non autorisé"})
        }
        else{
            if(auth.identifiant && auth.estManager){
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

// Display list of all manager.
exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: manager index');
};

// Display list of all manager.
exports.manager_list = function(req, res) {
    res.send('NOT IMPLEMENTED: manager list');
};

// Display list of all manager.
exports.manager_list = function(req, res) {
    res.send('NOT IMPLEMENTED: manager list');
};

// Display detail page for a specific manager.
exports.manager_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: manager detail: ' + req.params.id);
};

// Display manager create form on GET.
exports.manager_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: manager create GET');
};

// Handle manager create on POST.
exports.manager_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: manager create POST');
};

// Display manager delete form on GET.
exports.manager_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: manager delete GET');
};

// Handle manager delete on POST.
exports.manager_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: manager delete POST');
};

// Display manager update form on GET.
exports.manager_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: manager update GET');
};

// Handle manager update on POST.
exports.manager_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: manager update POST');
};