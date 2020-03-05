const ft = require("../functions");
const bcrypt = require('bcryptjs');
const Sanitizer = require('express-sanitizer');
const index = require('../models/index');
const staff = require('../models/staff');
const camper = require('../models/camper');
const booking = require('../models/booking');
const report = require('../models/report');


exports.is_staff = async (req, res, next) => {
    var token = ft.getToken(req)
    try {
        const verified = await index.verify_token(token)
        if (verified.identifiant && verified.estManager == 0) {
            res.locals.identifiant = verified.identifiant
            res.locals.id = verified.id
            next()
        }
        else {
            //403 - FORBIDDEN
            res.statusCode = 403
            res.render('includes/errors.ejs', { title: "CDS | Forbidden", status: 403, text: "Vous n'avez pas les droits pour accéder à cette ressource", code: "Accès interdit" })
        }
    }
    catch{
        //401 - UNAUTHORIZED
        res.statusCode = 401;
        res.render('includes/errors.ejs', { title: "CDS | Unauthorized", status: 401, text: "Vous devez vous connecter pour accéder à cette ressource", code: "Non autorisé" })
    }
}

exports.staff_index = async (req, res) => {
    const identifiant = res.locals.identifiant
    try {
        const _arrivals = await booking.count_arrivals()
        const _departures = await booking.count_departures()
        const _camp = await camper.count()
        const _nbIncid = await report.count()
        const _infr = await staff.count_infrastructures_to_clean()

        const arrivals = _arrivals[0]
        const departures = _departures[0]
        const camp = _camp[0]
        const incidents = _nbIncid[0]
        const infrastructures = _infr[0]

        const flash = ft.getFlash(req)

        res.render('personnel/index', { title: "CDS | Espace personnel", identifiant, arrivals, departures, camp, incidents, infrastructures, flash })

    }
    catch{
        const flash = {
            type: 'warning',
            text: 'Problème de connexion avec la base de donnée'
        }
        res.render('personnel/index', { title: "CDS | Espace personnel", identifiant, flash })
    }
}

exports.staff_reports = async (req, res) => {
    try {
        const flash = ft.getFlash(req)
        const rows = await report.find_all()
        var i
        for (i = 0; i < rows.length; i++) {
            rows[i].horodatage = ft.formatDateTime(rows[i].horodatage)
        }
        res.render('personnel/incidents', { title: "CDS | Liste des incidents", rows, flash })
    }
    catch{
        const flash = {
            type: 'warning',
            text: 'Problème de connexion avec la base de donnée'
        }
        res.render('personnel/incidents', { title: "CDS | Liste des incidents", flash })
    }
}

exports.staff_report_delete = async (req, res) => {
    try {
        await report.delete(req.params.id)
        ft.setFlash(res, 'success', "L'incident a bien été supprimé")
        res.redirect('/personnel/incidents')
    }
    catch{
        ft.setFlash(res, 'warning', "Problème de connexion avec la base de donnée")
        res.redirect('/personnel/incidents')
    }
}

exports.staff_campers = async (req, res) => {
    try {
        const flash = ft.getFlash(req)
        const rows = await booking.current_campers()
        res.render('personnel/campeurs', { title: "CDS | Liste des campeurs", rows, flash })
    }
    catch{
        const flash = {
            type: 'warning',
            text: 'Problème de connexion avec la base de donnée'
        }
        res.render('personnel/campeurs', { title: "CDS | Liste des campeurs", flash })
    }
}

exports.staff_camper = async (req, res) => {
    try {
        const _rows = await camper.find_by_id(req.params.id)
        const reservations = await camper.count_bookings(req.params.id)
        const reserv = reservations[0]
        const rows = _rows[0]
        res.render('personnel/campeur_id', { title: "CDS | Campeur " + req.params.id, rows, reserv })
    }
    catch{
        ft.setFlash(res, 'warning', "Problème de connexion avec la base de donnée")
        res.redirect('/personnel/campeurs')
    }
}

exports.staff_all_campers = async (req, res) => {
    try {
        const flash = ft.getFlash(req)
        const rows = await camper.find_all()
        res.render('personnel/campeurs_all', { title: "CDS | Tous les campeurs", rows, flash })
    }
    catch{
        ft.setFlash(res, 'warning', "Problème de connexion avec la base de donnée")
        res.redirect('/personnel/campeurs/all')
    }
}

exports.staff_arrivals = async (req, res) => {
    try {
        const flash = ft.getFlash(req)
        const rows = await booking.arrivals()
        res.render('personnel/arrivees', { title: "CDS | Liste des arrivées", rows, flash })
    }
    catch{
        const flash = {
            type: 'warning',
            text: 'Problème de connexion avec la base de donnée'
        }
        res.render('personnel/arrivees', { title: "CDS | Liste des arrivées", flash })
    }
}

exports.staff_departures = async (req, res) => {
    try {
        const flash = ft.getFlash(req)
        const rows = await booking.departures()
        res.render('personnel/departs', { title: "CDS | Liste des départs", rows, flash })
    }
    catch{
        const flash = {
            type: 'warning',
            text: 'Problème de connexion avec la base de donnée'
        }
        res.render('personnel/departs', { title: "CDS | Liste des départs", flash })
    }
}

exports.staff_checkout = async (req, res) => {
    try {
        await booking.checkout(req.params.id)
        ft.setFlash(res, 'success', "Le checkout viens d'être enregistré")
        res.redirect('/personnel/departs')
    }
    catch{
        ft.setFlash(res, 'warning', "Problème de connexion avec la base de donnée")
        res.redirect('/personnel/departs')
    }
}

exports.staff_checkin = async (req, res) => {
    try {
        await booking.checkin(req.params.id)
        ft.setFlash(res, 'success', "Le checkin viens d'être enregistré")
        res.redirect('/personnel/arrivees')
    }
    catch{
        ft.setFlash(res, 'warning', "Problème de connexion avec la base de donnée")
        res.redirect('/personnel/arrivees')
    }
}

exports.staff_plan = async (req, res) => {
    res.render('personnel/plan_interactif', { title: "CDS | Plan interractif" })
}

exports.staff_location = async (req, res) => {
    try {
        const _rows = await booking.find_location_by_id(req.params.id)
        const rows = _rows[0]
        if (rows.dateCreation) {
            rows.dateCreation = ft.formatDate(rows.dateCreation)
        }
        const _occupied = await booking.find_camper_by_location(req.params.id)
        const occupied = _occupied[0]
        res.render('personnel/emplacement_id', { title: "CDS | Emplacement " + req.params.id, rows, occupied })
    }
    catch{
        res.redirect('/personnel/plan')
    }
}

exports.staff_check_get = async (req, res) => {
    try {
        const rows = await staff.find_all_infrastructures()
        res.render('personnel/pointage', { title: "CDS | Pointage", rows })
    }
    catch{
        ft.setFlash(res, 'warning', "Problème de connexion avec la base de donnée")
        res.redirect('/connexion')
    }
}

exports.staff_check_post = async (req, res) => {
    try {
        await staff.clean(req.params.id, res.locals.id)
        ft.setFlash(res, 'success', 'Pointage enregistré')
        res.redirect('/personnel/pointage')
    }
    catch{
        ft.setFlash(res, 'warning', "Problème de connexion avec la base de donnée")
        res.redirect('/personnel/pointage')
    }
}