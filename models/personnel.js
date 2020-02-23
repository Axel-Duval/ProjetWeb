function Personnel (params) {
    this.id = params.id
    this.identifiant = params.identifiant
    this.estManager = params.estManager
    this.dateCreation = params.dateCreation
    this.password = params.password
}
  
Personnel.prototype.getId = function() {
    return this.id
}

Personnel.prototype.getIdentifiant = function() {
    return this.identifiant
}

Personnel.prototype.getestManager = function() {
    return this.estManager
}

Personnel.prototype.getDateCreation = function() {
    return this.dateCreation
}

Personnel.prototype.getPassword = function() {
    return this.password
}
  
module.exports = Personnel