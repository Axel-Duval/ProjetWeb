const db = require('./pool');
const jwt = require('jsonwebtoken');
const constants = require("../constants");

const booking = {

    /**
     * Create a booking from a period a location and a camper
     */
    create : async (arr,dep,camp,loc)=>{
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO reservations (dateDebut, dateFin, checkin, checkout, idCampeur, idEmplacement) VALUES (?,?,0,0,?,?)", [arr,dep,camp,loc], (err,rows)=>{
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
     * Delete a booking
     */
    delete : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM reservations WHERE reservations.id=?", [id], (err,rows)=>{
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
     * Do the checkin from a booking id
     */
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

    /**
     * Do the checkout from a booking id
     */
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

    /**
     * Find a camper on a location from location id
     */
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

    /**
     * Count the arrivals of the day
     */
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

    /**
     * Count the departures of the day
     */
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

    /**
     * Return a list of current campers
     */
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

    /**
     * Return a list of campers which arriving today
     */
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

    /**
     * Return a list of campers which leaving today
     */
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

    /**
     * Return information of location from a location id
     */
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

    /**
     * Return a list of simple locations available during a specific period
     */
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

    /**
     * Return a list of chalets available during a specific period
     */
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

    /**
     * Return a list of all locations available during a specific period
     */
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
    },

    /**
     * Check if a location exists from a location id
     */
    location_exists : async (id)=>{
        return new Promise((resolve, reject) => {
            db.query("SELECT COUNT(emplacements.id) AS cpt FROM emplacements WHERE emplacements.id=?", [id], (err,rows)=>{
                if (err) {
                    reject(err)
                }
                else{
                    resolve(rows[0].cpt==1)
                }
            })
        })
    }
}

module.exports = booking;