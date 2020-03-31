const Sequelize = require('sequelize')

const DATABASE = process.env.DATABASE
const DBUSER = process.env.DBUSER
const DBPASSWORD = process.env.DBPASSWORD
const DBHOST = process.env.DBHOST
const DBDIALECT = process.env.DBDIALECT

const sequelize = new Sequelize(DATABASE, DBUSER, DBPASSWORD, {
    host: DBHOST,
    dialect: DBDIALECT
})

sequelize.authenticate()
    .then(() => console.log('Database connection established successfully'))
    .catch(e => console.log('Unable to connect to database ', err))

module.exports = sequelize