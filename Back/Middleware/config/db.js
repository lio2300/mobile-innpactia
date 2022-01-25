const mysql= require("mysql");
const { user, host, database, password, port } = require("./config_db");

const pool = mysql.createPool({ 
    connectionLimit:4,
    host: host,
    user: user,
    password: password,
    database:database
 });

module.exports = pool;