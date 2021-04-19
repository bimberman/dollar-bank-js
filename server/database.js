// get the client
const mysql = require('mysql2');

// eslint-disable-next-line new-cap
const pool = new mysql.createPool({
  host: process.env.DB_HOST_REMOTE,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

module.exports = db;
