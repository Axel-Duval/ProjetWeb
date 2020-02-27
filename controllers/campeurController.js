const ft = require("../functions")
const bcrypt = require('bcryptjs')
const Sanitizer = require('express-sanitizer')
const index = require('../models/index')
const campeur = require('../models/campeur')


// Check if it's a manager
exports.isCampeur = async (req, res, next)=>{
    var token = ft.getToken(req)
    try{
        const verified = await index.verifyToken(token)
        if(verified.mail){
            res.locals.mail = verified.mail
            next()
        }
        else{
            //403 - FORBIDDEN
            res.statusCode = 403
            res.render('includes/errors.ejs',{title : "CDS | Forbidden", status : 403, text : "Vous n'avez pas les droits pour accéder à cette ressource", code : "Accès interdit"})
        }
    }
    catch{
        //401 - UNAUTHORIZED
        res.statusCode = 401;
        res.render('includes/errors.ejs',{title : "CDS | Unauthorized", status : 401, text : "Vous devez vous connecter pour accéder à cette ressource", code : "Non autorisé"})
    }
}



// Display index
exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: campeur index')
}