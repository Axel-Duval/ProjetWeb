const cookieParser = require('cookie-parser')

exports.setCookie = function(res,name,args,time){
    return res.cookie(name, args, { maxAge: time * 1000, httpOnly: true })
};

exports.getCookie = function(req,name){
    return req.cookies[name]
};

exports.clearCookie = function(res,name){
    return res.cookie(name, '', { maxAge: 0, httpOnly: true })
};

exports.setFlash = function(res,ftype,ftext){
    flash = {type : ftype, text : ftext}
    return res.cookie("flash_message",flash, { maxAge: 1 * 1000, httpOnly: true })
};

exports.getFlash = function(req){
    return req.cookies["flash_message"]
};

exports.clearFlash = function(res){
    return res.cookie("flash_message", '', { maxAge: 0, httpOnly: true })
};

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
        setFlash(res,'danger',"Veuillez renseigner votre adresse mail")
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
        setFlash(res,'danger',"Veuillez renseigner votre mot de passe")
        return false
    }
}