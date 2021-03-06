const db = require('./pool');
const jwt = require('jsonwebtoken');
const constants = require("../constants");

const staff = {

    /**
     * Find staff member from id
     */
    find_by_id : async (id)=>{
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

    /**
     * Update information of staff member from staff id
     */
    update : async (id,identifiant, password)=>{
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

    /**
     * Delete staff member
     */
    delete : async (id)=>{
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

    /**
     * Find staff member from name
     */
    find_by_name : async (identifiant)=>{
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

    /**
     * Create staff member
     */
    create : async (identifiant,estManager,password)=>{
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

    /**
     * Find all staff members
     */
    find_all : async ()=>{
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

    /**
     * Return the list of infrastructures with timestamp
     */
    find_all_infrastructures : async ()=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT passer.id, passer.idInfrastructure,infrastructures.libelle, passer.idPersonnel,MAX(passer.horodatage) AS recent,TIMEDIFF(NOW(),MAX(passer.horodatage)) AS time, (CASE WHEN TIMEDIFF(NOW(), MAX(passer.horodatage)) < TIME(infrastructures.intervalle) THEN 'non' ELSE 'oui' END) AS besoin FROM passer JOIN infrastructures ON infrastructures.id = passer.idInfrastructure GROUP BY passer.idInfrastructure", (err,rows)=>{
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
     * Clean infrastructure from infrastructure id and staff member id
     */
    clean : async (idInfra,IdPers)=>{
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO passer (idInfrastructure, idPersonnel) VALUES (?,?);",[idInfra,IdPers], (err,rows)=>{
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
     * Count the infrastructures to clean
     */
    count_infrastructures_to_clean : async ()=>{
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
    }
}

module.exports = staff;