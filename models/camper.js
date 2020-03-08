const db = require('./pool');
const jwt = require('jsonwebtoken');
const constants = require("../constants");

const camper = {

    /**
     * Return camper's infomation from a camper id
     */
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

    /**
     * Return a list of all campers
     */
    find_all : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM campeurs", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    /**
     * Return camper's infomation from a camper email
     */
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

    /**
     * Create a camper
     */
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

    /**
     * Update camper's information from camper id
     */
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

    /**
     * Count campers
     */
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

    /**
     * Return the bookings from a camper id
     */
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

    /**
     * Return the bookings id from a camper id
     */
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

    /**
     * Count bookings from a camper id
     */
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

    /**
     * Find booking information from a booking id
     */
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