const db = require('./pool')
const jwt = require('jsonwebtoken')
const constants = require("../constants")

const personnel = {

    findPersonnelById : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM personnel WHERE id=?", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    updatePersonnel : async (id,identifiant, password)=>{
        return new Promise((resolve, reject) => {
            db.query("UPDATE personnel SET identifiant=? , password=? WHERE id=?", [identifiant,password,id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    deletePersonnelById : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM personnel WHERE id=?", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    findPersonnelByIdentifiant : async (identifiant)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM personnel WHERE identifiant=?", [identifiant], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    createPersonnel : async (identifiant,estManager,password)=>{
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO personnel(identifiant, estManager, password) VALUES (?,?,?)", [identifiant,estManager,password], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    findAllPersonnel : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM personnel", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    nbArrivals : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(reservations.id) AS cpt FROM reservations WHERE reservations.dateDebut = DATE(NOW()) AND reservations.checkin=0", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    nbDepartures : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(reservations.id) AS cpt FROM reservations WHERE reservations.dateFin = DATE(NOW()) AND reservations.checkout=0", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    nbCampeurs : async ()=>{
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

    actualCampeurs : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT campeurs.id, campeurs.nom, campeurs.prenom FROM campeurs JOIN reservations ON campeurs.id = reservations.idCampeur WHERE reservations.checkin=1 AND reservations.checkout=0", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    nbInfrastructuresToCome : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(infrastructures.id) AS cpt FROM infrastructures WHERE infrastructures.id NOT IN( SELECT infrastructures.id FROM infrastructures JOIN passer ON infrastructures.id = passer.idInfrastructure WHERE TIMEDIFF(NOW(), passer.horodatage) < infrastructures.intervalle)", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    arrivals : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT campeurs.nom, campeurs.id AS idCampeur, reservations.idEmplacement, reservations.id, chalets.nom AS nomChalet , chalets.prestige FROM campeurs JOIN reservations ON campeurs.id = reservations.idCampeur JOIN emplacements ON emplacements.id = reservations.idEmplacement LEFT JOIN chalets ON chalets.id = emplacements.idChalet WHERE reservations.dateDebut = DATE(NOW()) AND reservations.checkin=0", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    departures : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT campeurs.nom, campeurs.id AS idCampeur, reservations.idEmplacement, reservations.id, chalets.nom AS nomChalet , chalets.prestige FROM campeurs JOIN reservations ON campeurs.id = reservations.idCampeur JOIN emplacements ON emplacements.id = reservations.idEmplacement LEFT JOIN chalets ON chalets.id = emplacements.idChalet WHERE reservations.dateFin = DATE(NOW()) AND reservations.checkout=0", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    findEmplacementById : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT emplacements.id, emplacements.surface, emplacements.electricite, chalets.nom, chalets.nombrePersonnes, chalets.dateCreation, chalets.prestige, zones.libelle FROM emplacements LEFT JOIN chalets ON chalets.id = emplacements.idChalet JOIN zones ON zones.id = emplacements.idZone WHERE emplacements.id=?",[id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    occupiedLocation : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT campeurs.id, campeurs.nom FROM campeurs JOIN reservations ON reservations.idCampeur = campeurs.id JOIN emplacements ON emplacements.id = reservations.idEmplacement WHERE reservations.checkin=1 AND reservations.checkout=0 AND emplacements.id=?",[id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    sales : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT SUM(DATEDIFF(reservations.dateFin,reservations.dateDebut)*prix.montant) AS tot FROM reservations JOIN emplacements ON emplacements.id = reservations.idEmplacement JOIN prix ON prix.id = emplacements.idPrix WHERE reservations.checkout=1", (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    checkin : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("UPDATE reservations SET checkin=1 WHERE id=?",[id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    checkout : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("UPDATE reservations SET checkout=1 WHERE id=?",[id], (err,rows)=>{
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

module.exports = personnel;