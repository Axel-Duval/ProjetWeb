const Personnel = require('../models/personnel')
const ft = require("../functions")
const constants = require("../constants")
const jwt = require('jsonwebtoken')
const db = require('../models/pool');
const bcrypt = require('bcryptjs')
const Sanitizer = require('express-sanitizer')


// Check if it's a personnel
exports.isPersonnel = function(req, res, next) {
    var token = ft.getToken(req)
    jwt.verify(token,constants.SECRET_KEY,(err,auth)=>{
        if(err){
            //401 - UNAUTHORIZED
            res.statusCode = 401;
            res.render('includes/errors.ejs',{title : "CDS | Unauthorized", status : 401, text : "Vous devez vous connecter pour accéder à cette ressource", code : "Non autorisé"})
        }
        else{
            if(auth.identifiant && !auth.estManager){
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

// Display list of all personnel.
exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel index');
};

// Display list of all personnel.
exports.personnel_list = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel list');
};

// Display list of all personnel.
exports.personnel_list = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel list');
};

// Display detail page for a specific personnel.
exports.personnel_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel detail: ' + req.params.id);
};

// Display personnel create form on GET.
exports.personnel_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel create GET');
};

// Handle personnel create on POST.
exports.personnel_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel create POST');
};

// Display personnel delete form on GET.
exports.personnel_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel delete GET');
};

// Handle personnel delete on POST.
exports.personnel_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel delete POST');
};

// Display personnel update form on GET.
exports.personnel_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel update GET');
};

// Handle personnel update on POST.
exports.personnel_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: personnel update POST');
};