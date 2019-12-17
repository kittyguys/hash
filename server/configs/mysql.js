import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hachet"
});

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "password",
  database: 'hachet',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default connection;
