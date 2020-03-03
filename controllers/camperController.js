const ft = require("../functions");
const bcrypt = require('bcryptjs');
const Sanitizer = require('express-sanitizer');
const index = require('../models/index');
const camper = require('../models/camper');
const report = require('../models/report');
const booking = require('../models/booking');


exports.camper_is_camper = async (req, res, next)=>{
    var token = ft.getToken(req)
    try{
        const verified = await index.verify_token(token)
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

exports.camper_see_booking = async (req, res, next)=>{
    try{
        const rows = await camper.find_all_bookings_id(res.locals.id)
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

exports.camper_bookings = async (req, res)=>{ 
    const prenom = res.locals.prenom
    try{
        const flash = ft.getFlash(req)
        const rows = await camper.find_all_bookings(res.locals.id)
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

exports.camper_booking = async (req, res)=>{ 
    try{
        const rows = await camper.find_booking(req.params.id)
        rows[0].dateDebut = ft.formatDate(rows[0].dateDebut)
        rows[0].dateFin = ft.formatDate(rows[0].dateFin)
        res.render('campeur/reservation_id',{title : "CDS | Réservation "+ req.params.id,rows})
    }
    catch{
        ft.setFlash(res,'warning',"Impossible d'accéder à la ressource")
        res.redirect('/connexion')
    }
}

exports.camper_report_get = async (req, res)=>{
    try{
        const infrastructures = await report.find_all_infrastructures()
        const types = await report.find_all_types()
        const flash = ft.getFlash(req)
        res.render('campeur/signaler',{title : "CDS | Signaler",flash,infrastructures,types,csrfToken : req.csrfToken()})
    }
    catch{
        ft.setFlash(res,'warning','Problème de connexion avec la base de donnée')
        res.redirect('/connexion')
    }
}

exports.camper_report_post = async (req, res)=>{
    try{
        const signal = await report.create(res.locals.id,req.body.type,req.body.infrastructure)
        ft.setFlash(res,'success',"Le signalement viens d'être envoyé")
        res.redirect('/campeur')
    }
    catch{
        ft.setFlash(res,'warning','Problème de connexion avec la base de donnée')
        res.redirect('/campeur/signaler')
    }
}

exports.camper_account_get = async (req, res)=>{
    try{
        const rows = await camper.find_by_id(res.locals.id)
        const camp = rows[0]
        const flash = ft.getFlash(req)
        res.render('campeur/compte',{title : "CDS | Mon compte",camp,flash,csrfToken : req.csrfToken()})
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/connexion')
    }
}

exports.camper_account_post = async (req, res)=>{
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
                const uptdated = await camper.update(res.locals.id,nomS,prenomS,mailS,telephoneS,hashPassword)
                ft.setFlash(res,'success',"Votre compte viens d'être modifié")
                ft.clearToken(res)
                const user = {
                    id : res.locals.id,
                    nom : nomS,
                    prenom : prenomS,
                    mail : mailS
                }
                const token = index.create_token(user)
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

exports.camper_delete_booking = async (req, res)=>{ 
    try{        
        await booking.delete(req.params.id)
        ft.setFlash(res,'success',"La réservation viens d'être supprimée")
        res.redirect('/campeur')
        
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/campeur')
    }
}

exports.camper_can_delete = async (req, res, next)=>{
    try{        
        const res = await camper.find_booking(req.params.id)
        if(res[0].checkin==0){
            next()
        }
        else{
            ft.setFlash(res,'danger',"Vous ne pouvez pas supprimer cette réservation")
            res.redirect('/campeur')
        }        
    }
    catch{
        ft.setFlash(res,'danger',"Vous ne pouvez pas supprimer cette réservation")
        res.redirect('/campeur')
    }
}

