import mysql from "mysql2";
import mysqlPromise from "mysql2/promise";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hachet"
});

export const pool = mysqlPromise.createPool({
  host: 'localhost',
  user: 'root',
  password: "password",
  database: 'hachet',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default connection;
