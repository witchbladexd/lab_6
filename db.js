const Pool = require('pg').Pool
const pool = new Pool( {
    user: "postgres",
    password: "1",
    host: "localhost",
    port: 5432,
    database: "lab_6"
})

module.exports = pool