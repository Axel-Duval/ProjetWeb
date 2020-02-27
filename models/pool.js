const mysql = require('mysql')
const constants = require("../constants")


//const pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

const pool = mysql.createPool({
    connectionLimit: constants.DB_LIMIT,
    host: constants.DB_HOST,
    user: constants.DB_USER,
    password: constants.DB_PSWD,
    database: constants.DB_NAME
})


pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...")    
    if(connection)
        connection.release()
    return;
})


module.exports = pool
