const ft = require("../functions");
const constants = require("../constants");
const bcrypt = require('bcryptjs');
const Sanitizer = require('express-sanitizer');
const index = require('../models/index');
const camper = require('../models/camper');
const staff = require('../models/staff');
const booking = require('../models/booking');


exports.index = (req, res)=>{
    res.render('index/index',{title : "CDS | Accueil"});
}

exports.index_login_get = async (req, res)=>{
    const flash = ft.getFlash(req);
    const token = ft.getToken(req);
    if(token){
        try{
            const verified = await index.verify_token(token)
            if(verified.estManager==0 || verified.estManager==1){
                verified.estManager == 0 ? res.redirect('/personnel') : res.redirect('/manager');
            }
            else{
                res.redirect('/campeur')
            }
        }
        catch{
            res.render('index/connexion',{title : "CDS | Connexion",flash,csrfToken : req.csrfToken()});
        } 
    }
    else{
        res.render('index/connexion',{title : "CDS | Connexion",flash,csrfToken : req.csrfToken()});
    }    
}

exports.index_login_post = async (req, res)=>{
    //Get email and password from POST
    const isEmail = ft.isEmail(req,res);
    const isPassword = ft.isPswd(req,res);

    //If there is an email & password
    if(isEmail && isPassword){
        //Sanitize all the stuff
        const mailS = req.sanitize(req.body.email);
        const passwordS = req.sanitize(req.body.password);
        //Check in database if there is a campeur with this email
        try{
            const rows = await camper.find_by_email(mailS);
            //If it is a campeur
            if(rows[0]){

                //If the password is good
                if(bcrypt.compareSync(passwordS, rows[0].password)){
                    //CREATE JSON WEB-TOKEN
                    const user = {
                        id : rows[0].id,
                        nom : rows[0].nom,
                        prenom : rows[0].prenom,
                        mail : rows[0].mail
                    };
                    const token = index.create_token(user);
                    ft.setToken(res,token);
                    res.redirect('/connexion');
                    
                }
                //Invalid password
                else{
                    ft.setFlash(res,'danger',"Connexion invalide");
                    res.redirect('/connexion');
                }
            }
            else{
                //Need to check in the personnel
                try{
                    const rows = await staff.find_by_name(mailS);
                    //If it is a personnel
                    if(rows[0]){
                        //If the password is good
                        if(bcrypt.compareSync(passwordS, rows[0].password)){
                            //CREATE JSON WEB-TOKEN
                            const user = {
                                id : rows[0].id,
                                identifiant : rows[0].identifiant,
                                estManager : rows[0].estManager
                            };
                            const token = index.create_token(user);
                            ft.setToken(res,token);
                            res.redirect('/connexion');
                            
                        }
                        //Invalid password
                        else{
                            ft.setFlash(res,'danger',"Connexion invalide");
                            res.redirect('/connexion');
                        }
                    }
                    //Not in database
                    else{
                        ft.setFlash(res,'danger',"Connexion invalide");
                        res.redirect('/connexion');
                    }
                }
                catch{
                    ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée");
                    res.redirect('/connexion');
                }
            }
        }
        //Error from database
        catch{
            ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée");
            res.redirect('/connexion');
        }
    }
    else{
        res.redirect('/connexion');
    }    
}

exports.index_register_get = (req, res)=>{
    const flash = ft.getFlash(req);
    res.render('index/inscription',{title : "CDS | Inscription",flash,csrfToken : req.csrfToken()});
}

exports.index_register_post = async (req, res)=>{
    //Get data from POST
    const isEmail = ft.isEmail(req,res);
    const isPassword = ft.isPswd(req,res);
    const isNom = ft.isNom(req,res);
    const isPrenom = ft.isPrenom(req,res);
    const isTelephone = ft.isTelephone(req,res);
    const isConfirmPassword = ft.isConfirmPassword(req,res);
    
    //If all the data is good
    if(isEmail && isPassword && isNom && isPrenom && isTelephone && isConfirmPassword){
        const mailS = req.sanitize(req.body.email);
        const passwordS = req.sanitize(req.body.password);
        const nomS = req.sanitize(req.body.nom);
        const prenomS = req.sanitize(req.body.prenom);
        const telephoneS = req.sanitize(req.body.telephone);
        try{
            const rows = await camper.find_by_email(mailS);
            if(rows[0]){
                ft.setFlash(res,'danger',"Désolé, cet email est déjà pris");
                res.redirect('/inscription');
            }
            else{
                const hashPassword = bcrypt.hashSync(passwordS,10);
                try{
                    const created = await camper.create(nomS,prenomS,mailS,telephoneS,hashPassword)
                    ft.setFlash(res,'success',"Votre compte viens d'être créer");
                    res.redirect('/connexion');
                }
                catch{
                    ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée");
                    res.redirect('/inscription');
                }
            }
        }
        catch{
            ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée");
            res.redirect('/inscription');
        }
    }
    else{
        res.redirect('/inscription');
    }
}

exports.index_prices = (req, res)=>{
    res.render('index/tarifs',{title : "CDS | tarifs"});
}

exports.index_logout = (req, res)=>{
    ft.clearToken(res);
    ft.clearFlash(res);
    res.redirect('/');
}

exports.index_about = (req, res)=>{
    res.render('index/a_propos',{title : "CDS | A propos"});
}

exports.index_team = (req, res)=>{
    res.render('index/notre_equipe',{title : "CDS | Notre équipe"});
}

exports.index_contact = (req, res)=>{
    res.render('index/contact',{title : "CDS | Contact"});
}

exports.index_legal_notice = (req, res)=>{
    res.render('index/mentions_legales',{title : "CDS | Mentions légales"});
}

exports.index_booking = async (req, res)=>{
    const flash = ft.getFlash(req);
    const arr = req.query.arrivee;
    const dep = req.query.depart;
    const type = req.query.type;

    const arrV = ft.isValidDate(arr);
    const depV = ft.isValidDate(dep);
    const typeV = req.sanitize(type);

    if(arrV && depV){
        if(arr>dep){
            ft.setFlash(res,'danger','Intervalle de temps non valide');
            res.redirect('/reservation');
        }
        else{
            if(typeV=='tente'){
                try{
                    const rows = await booking.find_location(arrV,depV);
                    res.render('index/reservation',{title : "CDS | Réservation",rows,arr,dep,type});
                }
                catch{
                    ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée");
                    res.redirect('/reservation');
                }
            }
            else if(typeV=='chalet' || typeV=='suite'){
                const val = typeV == 'chalet' ? 0 : 1
                try{
                    const rows = await booking.find_chalet(val,arrV,depV);
                    res.render('index/reservation',{title : "CDS | Réservation",rows,arr,dep,type});
                }
                catch{
                    ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée");
                    res.redirect('/reservation');
                }
            }
            else{
                try{
                    const rows = await booking.find_all(arrV,depV);
                    res.render('index/reservation',{title : "CDS | Réservation",rows,arr,dep});
                }
                catch{
                    ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée");
                    res.redirect('/reservation');
                }
            }
        }
    }
    else{
        const flash = ft.getFlash(req);
        res.render('index/reservation',{title : "CDS | Réservation",flash});
    }
}

exports.index_booking_location = async (req, res)=>{
    const flash = ft.getFlash(req);
    const _arr = req.params.arrival
    const _dep = req.params.departure;
    const _location = req.params.id_location;

    const arr = ft.isValidDate(_arr);
    const dep = ft.isValidDate(_dep);
    try{
        const location = await booking.location_exists(_location);
        if(arr && dep && location){
            if(_arr<_dep){
                try{
                    const rows = await booking.create(_arr,_dep,res.locals.id,_location)
                    ft.setFlash(res,'success',"La réservation viens d'être enregistrée");
                    res.redirect('/connexion');
                }
                catch{
                    ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée");
                    res.redirect('/reservation');
                }
            }
            else{
                ft.setFlash(res,'danger','Intervalle de temps non valide');
                res.redirect('/reservation');
            }
        }
        else{
            ft.setFlash(res,'danger','Entrées non valides');
            res.redirect('/reservation');
        }
    }
    catch{
        res.redirect('/reservation');
    }
}