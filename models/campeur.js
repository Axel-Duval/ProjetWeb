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

    findAllCampeurs : async (id)=>{
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

    updateCampeur : async (id,nom,prenom,mail,telephone,password)=>{
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
            db.query("SELECT signaler.id, signaler.horodatage, campeurs.telephone ,campeurs.nom, infrastructures.libelle AS endroit, types.libelle FROM signaler JOIN types ON types.id = signaler.idTypeSignal JOIN campeurs ON campeurs.id = signaler.idCampeur LEFT JOIN infrastructures ON infrastructures.id = signaler.idInfrastructure", (err,rows)=>{
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
    },

    getAllReservationsById : async (id)=>{
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

    getIdReservationsById : async (id)=>{
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

    getReservationById : async (id)=>{
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
    },

    getAllInfrastructures : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM infrastructures", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    getAllTypes : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM types", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    createSignalement : async (idCampeur,idType,idInfrastructure)=>{
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO signaler (idCampeur, idTypeSignal, idInfrastructure) VALUES (?,?,?);", [idCampeur,idType,idInfrastructure], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },
}

module.exports = campeur;