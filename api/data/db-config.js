const knex = require('knex')
const environment = 'development'
const config = require('../../knexfile')

module.exports = knex(config[environment])