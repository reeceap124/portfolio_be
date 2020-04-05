const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: process.env.DBHOST || 'localhost',
  database: 'portfolio',
  password: process.env.DBPASS,
  post: 5432
})

module.exports = pool