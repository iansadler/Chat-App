const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'admin',
  database: 'chat_app_database',
  host: 'localhost',
  port: '5432'
})

module.exports = pool
