const { Pool } = require('pg')

const pool = new Pool({
  user: 'bluiymcirgxtlt',
  host: 'ec2-52-6-143-153.compute-1.amazonaws.com',
  database: 'd1iciie7u7b9m3',
  password: '49e0b9d8a677837f872ebb9972aa9dba40937334562e126e15fa98cd85c94ad1',
  post: 5432,
  ssl: { rejectUnauthorized: false }
})

module.exports = pool