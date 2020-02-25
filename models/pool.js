const mysql = require('mysql')
const constants = require("../constants")


const pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...")    
    if(connection)
        connection.release()
    return;
});


module.exports = pool
