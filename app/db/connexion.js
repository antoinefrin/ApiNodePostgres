const Pool = require('pg').Pool
const pool = new Pool({
  user: 'antoine',
  host: 'localhost',
  database: 'api',
  password: 'afpa2020',
  port: 5432,
})

module.exports = pool;