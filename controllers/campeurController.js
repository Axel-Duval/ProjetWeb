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
            res.locals.prenom = verified.prenom
            res.locals.id = verified.id
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

// Check if it can access to this reservation
exports.canAccessReservation = async (req, res, next)=>{
    try{
        const rows = await campeur.getIdReservationsById(res.locals.id)
        let i = 0
        while (rows[i].id != req.params.id && i < rows.length) {
            i++;
        }
        if(rows[i].id == req.params.id){
            next()
        }
        else{
            //403 - FORBIDDEN
            res.statusCode = 403
            res.render('includes/errors.ejs',{title : "CDS | Forbidden", status : 403, text : "Vous n'avez pas les droits pour accéder à cette ressource", code : "Accès interdit"})
        }
        
    }
    catch{
        ft.setFlash(res,'warning',"Impossible d'accéder à la ressource")
        res.redirect('/connexion')
    }
}



// Display index
exports.campeur_reservations = async (req, res)=>{ 
    const prenom = res.locals.prenom
    try{
        const flash = ft.getFlash(req)
        const rows = await campeur.getAllReservationsById(res.locals.id)
        var i
        for(i = 0; i < rows.length; i++){
            rows[i].dateDebut = ft.formatDate(rows[i].dateDebut)
            rows[i].dateFin = ft.formatDate(rows[i].dateFin)
        }
        res.render('campeur/reservations',{title : "CDS | Mes réservations", prenom, flash, rows})
    }
    catch{
        const flash = {
            type : 'warning',
            text : 'Problème de connexion avec la base de donnée'
        }
        res.render('campeur/reservations',{title : "CDS | Mes réservations", prenom, flash})
    }
}

exports.campeur_reservation_id = async (req, res)=>{ 
    try{
        const rows = await campeur.getReservationById(req.params.id)
        rows[0].dateDebut = ft.formatDate(rows[0].dateDebut)
        rows[0].dateFin = ft.formatDate(rows[0].dateFin)
        res.render('campeur/reservation_id',{title : "CDS | Réservation "+ req.params.id,rows})
    }
    catch{
        ft.setFlash(res,'warning',"Impossible d'accéder à la ressource")
        res.redirect('/connexion')
    }
}

exports.campeur_signaler_get = async (req, res)=>{
    try{
        const infrastructures = await campeur.getAllInfrastructures()
        const types = await campeur.getAllTypes()
        const flash = ft.getFlash(req)
        res.render('campeur/signaler',{title : "CDS | Signaler",flash,infrastructures,types})
    }
    catch{
        ft.setFlash(res,'warning','Problème de connexion avec la base de donnée')
        res.redirect('/connexion')
    }
}

exports.campeur_signaler_post = async (req, res)=>{
    try{
        const signal = await campeur.createSignalement(res.locals.id,req.body.type,req.body.infrastructure)
        ft.setFlash(res,'success',"Le signalement viens d'être envoyé")
        res.redirect('/campeur')
    }
    catch{
        ft.setFlash(res,'warning','Problème de connexion avec la base de donnée')
        res.redirect('/campeur/signaler')
    }
}

exports.campeur_compte_get = async (req, res)=>{
    try{
        const rows = await campeur.findCampeurById(res.locals.id)
        const camp = rows[0]
        const flash = ft.getFlash(req)
        res.render('campeur/compte',{title : "CDS | Mon compte",camp,flash})
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/connexion')
    }
}

exports.campeur_compte_post = async (req, res)=>{
    //Get data from POST
    const isEmail = ft.isEmail(req,res)
    const isPassword = ft.isPswd(req,res)
    const isNom = ft.isNom(req,res)
    const isPrenom = ft.isPrenom(req,res)
    const isTelephone = ft.isTelephone(req,res)
    const isConfirmPassword = ft.isConfirmPassword(req,res)
    
    //If all the data is good
    if(isEmail && isPassword && isNom && isPrenom && isTelephone && isConfirmPassword){
        const mailS = req.sanitize(req.body.email)
        const passwordS = req.sanitize(req.body.password)
        const nomS = req.sanitize(req.body.nom)
        const prenomS = req.sanitize(req.body.prenom)
        const telephoneS = req.sanitize(req.body.telephone)
        try{
            const hashPassword = bcrypt.hashSync(passwordS,10)
            try{
                const uptdated = await campeur.updateCampeur(res.locals.id,nomS,prenomS,mailS,telephoneS,hashPassword)
                ft.setFlash(res,'success',"Votre compte viens d'être modifié")
                ft.clearToken(res)
                const user = {
                    id : res.locals.id,
                    nom : nomS,
                    prenom : prenomS,
                    mail : mailS
                }
                const token = index.createToken(user)
                ft.setToken(res,token)
                res.redirect('/campeur')
            }
            catch{
                ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
                res.redirect('/inscription')
            }
        }
        catch{
            ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
            res.redirect('/campeur')
        }
    }
    else{
        res.redirect('/campeur/compte')
    }
}