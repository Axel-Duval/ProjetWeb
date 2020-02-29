"use strict"

const $arrivals = document.getElementById('arrivals')
$arrivals.addEventListener('click', (event)=>{
    window.location.href = "/personnel/arrivees"
})

const $departures = document.getElementById('departures')
$departures.addEventListener('click', (event)=>{
    window.location.href = "/personnel/departs"
})

const $campeurs = document.getElementById('campeurs')
$campeurs.addEventListener('click', (event)=>{
    window.location.href = "/personnel/campeurs"
})

const $inf = document.getElementById('inf')
$inf.addEventListener('click', (event)=>{
    window.location.href = "/personnel/passages"
})

const $incidents = document.getElementById('incidents')
$incidents.addEventListener('click', (event)=>{
    window.location.href = "/personnel/incidents"
})

const $plan = document.getElementById('plan')
$plan.addEventListener('click', (event)=>{
    window.location.href = "/personnel/plan"
})


