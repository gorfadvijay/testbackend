const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   database: "testdb",
//   user: "postgres",
//   password: "25129900",
// });
module.exports = pool;
