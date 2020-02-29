const ft = require("../functions")
const bcrypt = require('bcryptjs')
const Sanitizer = require('express-sanitizer')
const index = require('../models/index')
const personnel = require('../models/personnel')
const campeur = require('../models/campeur')


// Check if it's a personnel
exports.isPersonnel = async (req, res, next)=>{
    var token = ft.getToken(req)
    try{
        const verified = await index.verifyToken(token)
        if(verified.identifiant && verified.estManager == 0){
            res.locals.identifiant = verified.identifiant
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

// Display list of all personnel.
exports.index = async (req, res)=>{
    const identifiant = res.locals.identifiant
    try{
        const _arrivals = await personnel.nbArrivals()
        const _departures = await personnel.nbDepartures()
        const _camp = await personnel.nbCampeurs()
        const _nbIncid = await campeur.getNbIncidents()
        const _infr = await personnel.nbInfrastructuresToCome()

        const arrivals = _arrivals[0]
        const departures = _departures[0]
        const camp = _camp[0]
        const incidents = _nbIncid[0]
        const infrastructures = _infr[0]
        res.render('personnel/index',{title : "CDS | Espace personnel",identifiant,arrivals,departures,camp,incidents,infrastructures})
        
    }
    catch{
        const flash = {
            type : 'warning',
            text : 'Problème de connexion avec la base de donnée'
        }
        res.render('personnel/index',{title : "CDS | Espace personnel",identifiant,flash})
    }
}

// Display incidents
exports.personnel_incidents = async (req, res)=>{
    try{
        const flash = ft.getFlash(req)
        const rows = await campeur.getIncidents()
        var i
        for(i = 0; i < rows.length; i++){
            rows[i].horodatage = ft.formatDateTime(rows[i].horodatage)
        }
        res.render('personnel/incidents',{title : "CDS | Liste des incidents",rows,flash})
    }
    catch{
        const flash = {
            type : 'warning',
            text : 'Problème de connexion avec la base de donnée'
        }
        res.render('personnel/incidents',{title : "CDS | Liste des incidents",flash})
    }
}

exports.personnel_incident_delete_id = async (req, res)=>{
    try{
        const rows = await campeur.deleteIncidentById(req.params.id)
        ft.setFlash(res,'success',"L'incident a bien été supprimé")
        res.redirect('/personnel/incidents')
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/personnel/incidents')
    }
}

// Display incidents
exports.personnel_campeurs = async (req, res)=>{
    try{
        const flash = ft.getFlash(req)
        const rows = await personnel.actualCampeurs()
        res.render('personnel/campeurs',{title : "CDS | Liste des campeurs",rows,flash})
    }
    catch{
        const flash = {
            type : 'warning',
            text : 'Problème de connexion avec la base de donnée'
        }
        res.render('personnel/campeurs',{title : "CDS | Liste des campeurs",flash})
    }
}

exports.personnel_campeur_id = async (req, res)=>{
    try{
        const _rows = await campeur.findCampeurById(req.params.id)
        const rows = _rows[0]
        console.log(rows)
        res.render('personnel/campeur_id',{title : "CDS | Campeur "+ req.params.id,rows})
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/personnel/campeurs')
    }
}