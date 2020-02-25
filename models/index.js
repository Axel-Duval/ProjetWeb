const db = require('./pool')
const jwt = require('jsonwebtoken')
const constants = require("../constants")

const index = {

    verifyToken : async (token)=>{
        return new Promise((resolve, reject) => {
            jwt.verify(token,constants.SECRET_KEY,(err,auth)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(auth)
                }
            })
        })
    },

    findPersonnelByEmail : async (email)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM personnel WHERE identifiant=?", [email], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    createToken : (params)=>{
        return jwt.sign(params,constants.SECRET_KEY,{expiresIn: '5h'})
    },

    findReservPossibleTent : async (arr,dep)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT emplacements.id, chalets.nom , chalets.prestige FROM emplacements LEFT JOIN chalets ON chalets.id = emplacements.idChalet WHERE emplacements.idChalet IS null AND emplacements.id NOT IN( SELECT reservations.idEmplacement FROM reservations WHERE ? <= reservations.dateFin AND ? >= reservations.dateDebut)", [arr,dep], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    findReservPossibleChalet : async (val,arr,dep)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT emplacements.id, chalets.nom , chalets.prestige FROM emplacements LEFT JOIN chalets ON chalets.id = emplacements.idChalet WHERE chalets.prestige=? AND emplacements.id NOT IN( SELECT reservations.idEmplacement FROM reservations WHERE ? <= reservations.dateFin AND ? >= reservations.dateDebut)", [val,arr,dep], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    findReservPossible : async (arr,dep)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT emplacements.id, chalets.nom , chalets.prestige FROM emplacements LEFT JOIN chalets ON chalets.id = emplacements.idChalet WHERE emplacements.id NOT IN( SELECT reservations.idEmplacement FROM reservations WHERE ? <= reservations.dateFin AND ? >= reservations.dateDebut)", [arr,dep], (err,rows)=>{
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

module.exports = index;