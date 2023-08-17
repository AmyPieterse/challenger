//setup database connection
require("dotenv").config()//import .env file to access env
const {createPool} = require("mysql")//create an object create pool to set up connection with database

// Create connection variable
const connection = createPool({
    host:process.env.dbHost,
    user:process.env.dbUser,
    password:process.env.dbPwd,
    port:process.env.dbPort,
    database:process.env.dbName,
    multipleStatements: true,
    connectionLimit: 30,
});

module.exports = {connection}// export connection 