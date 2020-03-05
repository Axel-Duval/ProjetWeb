const ft = require("../functions");
const bcrypt = require('bcryptjs');
const Sanitizer = require('express-sanitizer');
const index = require('../models/index');
const staff = require('../models/staff');
const camper = require('../models/camper');
const stats = require('../models/stats');
const report = require('../models/report');


exports.is_manager = async (req, res, next)=>{
    var token = ft.getToken(req)
    try{
        const verified = await index.verify_token(token)
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

exports.manager_index = async (req, res)=>{
    const identifiant = res.locals.identifiant
    try{
        const campeursToCome = await stats.campers_coming()
        const campeursCome = await stats.campers_came()
        const averageDays = await stats.days_average()
        const nbIncid = await report.count()
        const _sales = await stats.sales()

        const campToCome = campeursToCome[0]
        const campCome = campeursCome[0]
        const avDays = averageDays[0]
        const incidents = nbIncid[0]
        const sales = ft.formatSales(_sales[0])

        const flash = ft.getFlash(req)
        res.render('manager/index',{title : "CDS | Espace manager",identifiant,campToCome,campCome,avDays,incidents,sales,flash})
    }
    catch{
        res.render('manager/index',{title : "CDS | Espace manager",identifiant})
    }    
}

exports.manager_all_staff = async (req, res)=>{
    try{
        const flash = ft.getFlash(req)
        const rows = await staff.find_all()
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

exports.manager_create_staff_get = (req, res)=>{
    const flash = ft.getFlash(req)
    res.render('manager/create',{title : "CDS | Création de personnel",flash,csrfToken : req.csrfToken()})
}

exports.manager_create_staff_post = async (req, res)=>{
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
            const rows = await staff.find_by_name(nomS)
            if(rows[0]){
                ft.setFlash(res,'danger',"Désolé, cet identifiant est déjà pris")
                res.redirect('/manager/personnel/create')
            }
            else{
                const hashPassword = bcrypt.hashSync(passwordS,10)
                const manager = estManager ? 1 : 0
                try{
                    await staff.create(nomS,manager,hashPassword)
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

exports.manager_staff = async (req, res)=>{
    try{
        const rows = await staff.find_by_id(req.params.id)
        if(rows[0]){
            const pers = rows[0]
            const flash = ft.getFlash(req)
            res.render('manager/personnel_id',{title : "CDS | Personnel",pers,flash,csrfToken : req.csrfToken()})
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

exports.manager_delete_staff = async (req, res)=>{
    try{
        await staff.delete(req.params.id)
        ft.setFlash(res,'success',"L'utilisateur a bien été supprimé")
        res.redirect('/manager/personnel')
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/manager/personnel')
    }
}

exports.manager_update_staff = async (req, res)=>{
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
            await staff.update(req.params.id,nomS,hashPassword)
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

exports.manager_all_reports = async (req, res)=>{
    try{
        const flash = ft.getFlash(req)
        const rows = await report.find_all()
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

exports.manager_delete_report = async (req, res)=>{
    try{
        await report.delete(req.params.id)
        ft.setFlash(res,'success',"L'incident a bien été supprimé")
        res.redirect('/manager/incidents')
    }
    catch{
        ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
        res.redirect('/manager/incidents')
    }
}