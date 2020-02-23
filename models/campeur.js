function Campeur (params) {
    this.id = params.id
    this.nom = params.nom
    this.prenom = params.prenom
    this.mail = params.mail
    this.dateCreation = params.dateCreation
    this.token = params.token
    this.password = params.password
    this.telephone = params.telephone
}
  
Campeur.prototype.getId = function() {
    return this.id
}

Campeur.prototype.getNom = function() {
    return this.nom
}

Campeur.prototype.getPrenom = function() {
    return this.prenom
}

Campeur.prototype.getMail = function() {
    return this.mail
}

Campeur.prototype.getDateCreation = function() {
    return this.dateCreation
}

Campeur.prototype.getToken = function() {
    return this.token
}

Campeur.prototype.getPassword = function() {
    return this.password
}

Campeur.prototype.getTelephone = function() {
    return this.telephone
}
  
module.exports = Campeur