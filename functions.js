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
    flash = {
        type : ftype,
        text : ftext
    }
    return res.cookie("flash_message",flash, { maxAge: 10 * 1000, httpOnly: true })
};

exports.getFlash = function(req){
    return req.cookies["flash_message"]
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

