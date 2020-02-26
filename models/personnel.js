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
    }
}

module.exports = personnel;