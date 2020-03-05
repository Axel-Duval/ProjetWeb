const cookieParser = require('cookie-parser');

exports.setCookie = function(res,name,args,time){
    return res.cookie(name, args, { maxAge: time * 1000, httpOnly: true })
}

exports.getCookie = function(req,name){
    return req.cookies[name]
}

exports.clearCookie = function(res,name){
    return res.cookie(name, '', { maxAge: 0, httpOnly: true })
}

exports.setFlash = function(res,ftype,ftext){
    const flash = {type : ftype, text : ftext}
    return res.cookie("flash_message",flash, { maxAge: 1 * 1000, httpOnly: true })
}

exports.getFlash = function(req){
    return req.cookies["flash_message"]
}

exports.clearFlash = function(res){
    return res.cookie("flash_message", '', { maxAge: 0, httpOnly: true })
}

exports.setToken = function(res,token){
    return res.cookie('auth', token, { maxAge: 6 * 60 * 60 * 1000, httpOnly: true })
}

exports.getToken = function(req){
    return req.cookies['auth']
}

exports.clearToken = function(res){
    return res.cookie('auth', '', { maxAge: 0, httpOnly: true })
}

exports.isEmail = function(req,res){
    if(req.body.email){
        if(req.body.email.length > 3){
            return true
        }
        else{
            exports.setFlash(res,'danger',"Cette adresse mail n'est pas valide")
            return false
        }
    }
    else{
        exports.setFlash(res,'danger',"Veuillez renseigner votre adresse mail")
        return false
    }
}

exports.isPswd = function(req,res){
    if(req.body.password){
        if(req.body.password.length > 5){
            return true
        }
        else{
            exports.setFlash(res,'danger',"Ce mot de passe n'est pas assez long")
            return false
        }
    }
    else{
        exports.setFlash(res,'danger',"Veuillez renseigner votre mot de passe")
        return false
    }
}

exports.isNom = function(req,res){
    if(req.body.nom){
        if(req.body.nom.length > 1){
            return true
        }
        else{
            exports.setFlash(res,'danger',"Ce nom n'est pas assez long")
            return false
        }
    }
    else{
        exports.setFlash(res,'danger',"Veuillez renseigner votre nom")
        return false
    }
}

exports.isPrenom = function(req,res){
    if(req.body.nom){
        if(req.body.prenom.length > 1){
            return true
        }
        else{
            exports.setFlash(res,'danger',"Ce prénom n'est pas assez long")
            return false
        }
    }
    else{
        exports.setFlash(res,'danger',"Veuillez renseigner votre prénom")
        return false
    }
}

exports.isTelephone = function(req,res){
    if(req.body.telephone){
        if(/^((\+)33|0)[1-9](?:[ _.-]?(\d{2})){4}$/g.test(req.body.telephone)){
            return true
        }
        else{
            exports.setFlash(res,'danger',"Ce numéro de téléphone n'est pas valide")
            return false
        }
    }
    else{
        exports.setFlash(res,'danger',"Veuillez renseigner votre numéro de téléphone")
        return false
    }
}

exports.isConfirmPassword = function(req,res){
    if(req.body.confirm_password && req.body.password){
        if(req.body.confirm_password == req.body.password){
            return true
        }
        else{
            exports.setFlash(res,'danger',"Les mots de passe ne correspondent pas")
            return false
        }
    }
    else{
        exports.setFlash(res,'danger',"Les mots de passe ne correspondent pas")
        return false
    }
}

exports.isValidDate = function(dateString){
    // First check for the RegExp pattern NNNN-NN-NN
    if(!/\d{4}\-\d{2}\-\d{2}/.test(dateString)){
        return false;
    }        

    // Parse the date parts to integers
    let parts = dateString.split("-");
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12){
        return false;
    }

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){
        monthLength[1] = 29;
    }       

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

exports.formatDateTime = (date)=>{
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let strTime = hours + ':' + minutes
    if(day < 10){
        day = '0'+ day
    }
    if(month < 10){
        month = '0' + month
    } 
    return day + "/" + month + "/" + year + "  " + strTime
}

exports.formatDate = (date)=>{
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    if(day < 10){
        day = '0'+ day
    }
    if(month < 10){
        month = '0' + month
    }
    return day + "/" + month + "/" + year
}

exports.formatSales = (sales)=>{
    if(sales.tot>1000){
        sales.tot = Math.round(sales.tot/100)/10 + "K"
        return sales
    }
    else{
        return sales
    }    
}