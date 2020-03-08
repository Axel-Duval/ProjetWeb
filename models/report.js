const db = require('./pool');
const jwt = require('jsonwebtoken');
const constants = require("../constants");

const report = {

    /**
     * Create a report
     */
    create : async (idCampeur,idType,idInfrastructure)=>{
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

    /**
     * Count reports
     */
    count : async ()=>{
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

    /**
     * Delete report from report id
     */
    delete : async (id)=>{
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

    /**
     * Find all reports
     */
    find_all : async ()=>{
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

    /**
     * Find all infrastructures
     */
    find_all_infrastructures : async ()=>{
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

    /**
     * Find all types
     */
    find_all_types : async ()=>{
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
    }
}

module.exports = report;