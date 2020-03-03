const db = require('./pool');
const jwt = require('jsonwebtoken');
const constants = require("../constants");

const camper = {

    find_by_id : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM campeurs WHERE id=?", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    find_all : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM campeurs", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    find_by_email : async (email)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM campeurs WHERE mail=?", [email], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    create : async (nom,prenom,mail,telephone,password)=>{
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO campeurs(nom, prenom, mail, telephone, password) VALUES (?,?,?,?,?)", [nom,prenom,mail,telephone,password], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    update : async (id,nom,prenom,mail,telephone,password)=>{
        return new Promise((resolve, reject) => {
            db.query("UPDATE campeurs SET nom=?, prenom=?, mail=?, telephone=?, password=? WHERE id=?", [nom,prenom,mail,telephone,password,id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    count : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(reservations.id) AS cpt FROM reservations WHERE reservations.checkin=1 AND reservations.checkout=0", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    find_all_bookings : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT id, dateDebut, dateFin FROM reservations WHERE reservations.idCampeur=?", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    find_all_bookings_id : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT id FROM reservations WHERE reservations.idCampeur=?", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    count_bookings : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(reservations.id) AS cpt FROM reservations WHERE reservations.idCampeur=?", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    find_booking : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT reservations.id, reservations.dateDebut, reservations.dateFin, reservations.checkin, reservations.checkout, reservations.idEmplacement,chalets.nom, chalets.prestige,chalets.nombrePersonnes FROM reservations JOIN campeurs ON campeurs.id = reservations.idCampeur JOIN emplacements ON emplacements.id = reservations.idEmplacement LEFT JOIN chalets ON chalets.id = emplacements.idChalet WHERE reservations.id=?", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = camper;