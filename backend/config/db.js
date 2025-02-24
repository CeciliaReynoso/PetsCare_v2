require('dotenv').config()
const { Pool } = require('pg')
const connectionString = process.env.PG_STRING_URL;
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, JWT_SECRET } = process.env

const DB = connectionString
  ? new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
      allowExitOnIdle: true,
    })
  : new Pool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      allowExitOnIdle: true,
    });

(async () => {
  try {
    await DB.query("SELECT NOW()");
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = {
    DB
}