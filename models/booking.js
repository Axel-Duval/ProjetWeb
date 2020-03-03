const db = require('./pool');
const jwt = require('jsonwebtoken');
const constants = require("../constants");

const booking = {

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
    },

    find_camper_by_location : async (id)=>{
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

    count_arrivals : async ()=>{
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

    count_departures : async ()=>{
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

    current_campers : async ()=>{
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

    find_location_by_id : async (id)=>{
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

    find_location : async (arr,dep)=>{
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

    find_chalet : async (val,arr,dep)=>{
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

    find_all : async (arr,dep)=>{
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

module.exports = booking;