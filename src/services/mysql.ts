import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export default connection;
