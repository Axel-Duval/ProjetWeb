const db = require('./pool');
const jwt = require('jsonwebtoken');
const constants = require("../constants");

const index = {

    /**
     * Verify the JWT token
     */
    verify_token : async (token)=>{
        return new Promise((resolve, reject) => {
            jwt.verify(token,constants.SECRET_KEY,(err,auth)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(auth)
                }
            })
        })
    },

    /**
     * Create the JWT token
     */
    create_token : (params)=>{
        return jwt.sign(params,constants.SECRET_KEY,{expiresIn: '5h'})
    }
}

module.exports = index;