const mysql2 = require("mysql2");
const fs = require("fs");

const dbConnection = mysql2.createPool({
  port: 3306,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  ssl: { ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem") },
  connectionLimit: 60000,
});

module.exports = dbConnection.promise();
