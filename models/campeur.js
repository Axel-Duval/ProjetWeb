const db = require('./pool')
const jwt = require('jsonwebtoken')
const constants = require("../constants")

const campeur = {

    findCampeurById : async (id)=>{
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

    findCampeurByEmail : async (email)=>{
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

    createCampeur : async (nom,prenom,mail,telephone,password)=>{
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

    nbCampeursToCome : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(campeurs.id) AS campeurs FROM campeurs JOIN reservations ON campeurs.id = reservations.idCampeur JOIN emplacements ON emplacements.id = reservations.idEmplacement WHERE reservations.checkin=0", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    nbCampeursCome : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(campeurs.id) AS campeurs FROM campeurs JOIN reservations ON campeurs.id = reservations.idCampeur JOIN emplacements ON emplacements.id = reservations.idEmplacement WHERE reservations.checkout=1", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    getAverageDays : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT AVG(DATEDIFF(reservations.dateFin,reservations.dateDebut)) AS av FROM reservations", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    getNbIncidents : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(signaler.id) as nb FROM signaler", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    getIncidents : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT signaler.id, signaler.horodatage, campeurs.nom, infrastructures.libelle, types.libelle FROM signaler JOIN types ON types.id = signaler.idTypeSignal JOIN campeurs ON campeurs.id = signaler.idCampeur LEFT JOIN infrastructures ON infrastructures.id = signaler.idInfrastructure", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    deleteIncidentById : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM signaler WHERE id=?", [id], (err,rows)=>{
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

module.exports = campeur;