const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('express-auth', 'root', 'renyinyu', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize

