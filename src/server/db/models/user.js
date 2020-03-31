const Sequelize = require('sequelize')
const sequelize = require('../connection')

const User = sequelize.define('users', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false
    },
    date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('User', 'Admin'),
        defaultValue: 'User'
    }
})

User.sync({
    force: false
}).then(() => console.log('User table successfully created'))
.catch(() => console.log('Failed to create user table'))

module.exports = User