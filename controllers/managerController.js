const ft = require("../functions")
const bcrypt = require('bcryptjs')
const Sanitizer = require('express-sanitizer')
const index = require('../models/index')
const personnel = require('../models/personnel')
const campeur = require('../models/campeur')


// Check if it's a manager
exports.isManager = async (req, res, next)=>{
    var token = ft.getToken(req)
    try{
        const verified = await index.verifyToken(token)
        if(verified.identifiant && verified.estManager == 1){
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

// Display index page manager
exports.index = async (req, res)=>{
    const identifiant = res.locals.identifiant
    try{
        const campeursToCome = await campeur.nbCampeursToCome()
        const campeursCome = await campeur.nbCampeursCome()
        const averageDays = await campeur.getAverageDays()
        const nbIncid = await campeur.getNbIncidents()

        const campToCome = campeursToCome[0]
        const campCome = campeursCome[0]
        const avDays = averageDays[0]
        const incidents = nbIncid[0]
        res.render('manager/index',{title : "CDS | Espace manager",identifiant,campToCome,campCome,avDays,incidents})
    }
    catch{
        res.render('manager/index',{title : "CDS | Espace manager",identifiant})
    }    
}

// Display list of the personnel
exports.personnel_list = async (req, res)=>{
    try{
        const flash = ft.getFlash(req)
        const rows = await personnel.findAllPersonnel()
        res.render('manager/personnel',{title : "CDS | Liste du personnel",rows,flash})
    }
    catch{
        const flash = {
            type : 'warning',
            text : 'Problème de connexion avec la base de donnée'
        }
        res.render('manager/personnel',{title : "CDS | Liste du personnel",flash})
    }
}

exports.create_personnel_get = (req, res)=>{
    const flash = ft.getFlash(req)
    res.render('manager/create',{title : "CDS | Création de personnel",flash})
}

exports.create_personnel_post = async (req, res)=>{
    //Get data from POST
    const isPassword = ft.isPswd(req,res)
    const isNom = ft.isNom(req,res)
    const isConfirmPassword = ft.isConfirmPassword(req,res)
    const estManager = req.body.estManager
    
    //If all the data is good
    if(isPassword && isNom && isConfirmPassword){
        const passwordS = req.sanitize(req.body.password)
        const nomS = req.sanitize(req.body.nom)
        try{
            const rows = await personnel.findPersonnelByIdentifiant(nomS)
            if(rows[0]){
                ft.setFlash(res,'danger',"Désolé, cet identifiant est déjà pris")
                res.redirect('/manager/personnel/create')
            }
            else{
                const hashPassword = bcrypt.hashSync(passwordS,10)
                const manager = estManager ? 1 : 0
                try{
                    const created = await personnel.createPersonnel(nomS,manager,hashPassword)
                    ft.setFlash(res,'success',"Le compte viens d'être créer")
                    res.redirect('/manager/personnel')
                }
                catch{
                    ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
                    res.redirect('/manager/personnel/create')
                }
            }
        }
        catch{
            ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
            res.redirect('/manager/personnel/create')
        }
    }
    else{
        res.redirect('/manager/personnel/create')
    }
}

exports.manager_personnel_id = async (req, res)=>{
    try{
        const rows = await personnel.findPersonnelById(req.params.id)
        if(rows[0]){
            const pers = rows[0]
            const flash = ft.getFlash(req)
            res.render('manager/personnel_id',{title : "CDS | Personnel",pers,flash})
        }
        else{
            ft.setFlash(res,'danger',"Personne avec cet id")
            res.redirect('/manager/personnel')
        }        
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/manager/personnel')
    }
}

exports.manager_delete_personnel = async (req, res)=>{
    try{
        const rows = await personnel.deletePersonnelById(req.params.id)
        ft.setFlash(res,'success',"L'utilisateur a bien été supprimé")
        res.redirect('/manager/personnel')
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/manager/personnel')
    }
}

exports.manager_update_personnel = async (req, res)=>{
    //Get data from POST
    const isPassword = ft.isPswd(req,res)
    const isNom = ft.isNom(req,res)
    const isConfirmPassword = ft.isConfirmPassword(req,res)

    //If all the data is good
    if(isPassword && isNom && isConfirmPassword){
        const passwordS = req.sanitize(req.body.password)
        const hashPassword = bcrypt.hashSync(passwordS,10)
        const nomS = req.sanitize(req.body.nom)
        try{
            const rows = await personnel.updatePersonnel(req.params.id,nomS,hashPassword)
            ft.setFlash(res,'success',"La modification viens d'être effectuée")
            res.redirect('/manager/personnel')
        }
        catch{
            ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
            res.redirect('/manager/personnel')
        }
    }
    else{
        res.redirect('/manager/personnel/'+req.params.id)
    }
}

// Display list of the personnel
exports.manager_incidents = async (req, res)=>{
    try{
        const flash = ft.getFlash(req)
        const rows = await campeur.getIncidents()
        var i
        for(i = 0; i < rows.length; i++){
            rows[i].horodatage = ft.formatDateTime(rows[i].horodatage)
        }
        res.render('manager/incidents',{title : "CDS | Liste des incidents",rows,flash})
    }
    catch{
        const flash = {
            type : 'warning',
            text : 'Problème de connexion avec la base de donnée'
        }
        res.render('manager/incidents',{title : "CDS | Liste des incidents",flash})
    }
}

exports.manager_incident_delete_id = async (req, res)=>{
    try{
        const rows = await campeur.deleteIncidentById(req.params.id)
        ft.setFlash(res,'success',"L'incident a bien été supprimé")
        res.redirect('/manager/incidents')
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/manager/incidents')
    }
}