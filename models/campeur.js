const db = require('./pool')

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

Campeur.prototype.getUserById = async (id)=>{
    return new Promise((res, rej)=>{
        db.query("SELECT * FROM campeurs WHERE id=?",[id],(err,rows)=>{
            if(err){
                rej(err)
            }
            else{
                res(rows)
            }
        })
    })
}
  
module.exports = Campeur