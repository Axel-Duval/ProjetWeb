const db = require('../models/pool');
const ft = require("../functions");
const constants = require("../constants");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Sanitizer = require('express-sanitizer')




// Display page principale
exports.index = function(req, res) {
    res.render('index/index',{title : "Camping des sources"})
};

// Display connexion GET
exports.index_connexion_get = function(req, res) {
    const token = ft.getToken(req)
    jwt.verify(token,constants.SECRET_KEY,(err,auth)=>{
        if(err){
            const flash = ft.getFlash(req)
            res.render('index/connexion',{title : "CDS | Connexion",flash})
        }
        else{
            //What kind of user ?
            if(auth.estManager){
                res.redirect('/manager')
            }
            else if(auth.identifiant && !auth.estManager){
                res.redirect('/personnel')
            }
            else{
                res.redirect('/campeur')
            }
        }
    })    
};

// Handle connexion POST
exports.index_connexion_post = function(req, res) {
    var isEmail = ft.isEmail(req,res)
    var isPassword = ft.isPswd(req,res)
    if(isEmail && isPassword){
        const mailS = req.sanitize(req.body.email)
        const passwordS = req.sanitize(req.body.password)
        db.query("SELECT id,nom,prenom,mail,password FROM campeurs WHERE mail=?",[mailS], (err,rows) =>{
            if(err){
                ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
                res.redirect('/connexion')
            }
            else{
                if(rows[0]){

                    if(bcrypt.compareSync(passwordS, rows[0].password)){
                        //CREATE JSON WEB-TOKEN
                        const user = {
                            id : rows[0].id,
                            nom : rows[0].nom,
                            prenom : rows[0].prenom,
                            mail : rows[0].mail
                        }

                        const token = jwt.sign(user,constants.SECRET_KEY,{expiresIn: '5h'})
                        ft.setToken(res,token)
                        res.redirect('/connexion')
                        
                    }
                    else{
                        //Invalid password
                        ft.setFlash(res,'danger',"Connexion invalide")
                        res.redirect('/connexion')
                    }

                }
                else{
                    //Is not a campeur
                    db.query("SELECT id,identifiant,estManager,password FROM personnel WHERE identifiant=?",[mailS], (err,rows) =>{
                        if(err){
                            ft.setFlash(res,'warning',"Problème de connexion avec la base de donnée")
                            res.redirect('/connexion')
                        }
                        else{
                            if(rows[0]){
                                //Is personnel or manager
                                if(bcrypt.compareSync(passwordS, rows[0].password)){    
                                    //CREATE LE JSON WEB-TOKEN
                                    const user = {
                                        id : rows[0].id,
                                        identifiant : rows[0].identifiant,
                                        estManager : rows[0].estManager
                                    }

                                    const token = jwt.sign(user,constants.SECRET_KEY,{expiresIn: '5h'})
                                    ft.setToken(res,token)
                                    res.redirect('/connexion')
                                }
                                else{
                                    //Invalid password
                                    ft.setFlash(res,'danger',"Connexion invalide")
                                    res.redirect('/connexion')
                                }
                            }
                            else{
                                //Don't know this person
                                ft.setFlash(res,'danger',"Connexion invalide")
                                res.redirect('/connexion')
                            }
                        }
                    })
                }
            }
        })
    }
    else{
        res.redirect('/connexion')
    }    
};

// Display inscription GET
exports.index_inscription_get = function(req, res) {
    const flash = ft.getFlash(req)
    res.render('index/inscription',{title : "CDS | Inscription",flash})
};

// Handle inscription POST
exports.index_inscription_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post page inscription');
};

// Display tarifs GET
exports.index_tarifs_get = function(req, res) {
    res.render('index/tarifs',{title : "CDS | tarifs"})
};

// Disconnect user GET
exports.index_deconnexion_get = function(req, res) {
    ft.clearToken(res)
    ft.clearFlash(res)
    res.redirect('/')
};

// Display a propos
exports.index_a_propos = function(req, res) {
    res.send('NOT IMPLEMENTED: a propos');
};

// Display reservation
exports.index_reservation = function(req, res) {
    res.send('NOT IMPLEMENTED: reservation');
};

// Display notre equipe
exports.index_notre_equipe = function(req, res) {
    res.send('NOT IMPLEMENTED: notre equipe');
};

// Display contact
exports.index_contact = function(req, res) {
    res.send('NOT IMPLEMENTED: contact');
};

// Display mentions legales
exports.index_mentions_legales = function(req, res) {
    res.send('NOT IMPLEMENTED: mentions legales');
};