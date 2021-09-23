const pgp = require('pg-promise')()
const { dbConection } = require('./dbConection')

const { USER, HOST, DATABASE, PASSWORD, PORT } = (dbConection)
const db = pgp({
    user: USER,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    database: DATABASE,
})

module.exports = db;