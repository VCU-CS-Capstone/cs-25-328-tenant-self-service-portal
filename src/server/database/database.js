const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  connectionLimit: 10
});

module.exports = pool;