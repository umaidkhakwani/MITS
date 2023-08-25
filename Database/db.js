const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mep_store',
  connectionLimit: 10 // You can adjust the connection limit as needed
});

module.exports = connection;