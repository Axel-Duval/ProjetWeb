const db = require('./pool');
const jwt = require('jsonwebtoken');
const constants = require("../constants");

const stats = {

    /**
     * Count coming campers
     */
    campers_coming : async ()=>{
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

    /**
     * Count leaving campers
     */
    campers_came : async ()=>{
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

    /**
     * Get average of staying days
     */
    days_average : async ()=>{
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

    /**
     * Get the turnover
     */
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
    }
}

module.exports = stats;