const { Pool } = require('pg');
require('dotenv').config();

const client = {
  host: process.env.PGHOST,
  name: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
};

const db = new Pool(client);

db.connect()
  .catch(e => {console.log(e)});

module.exports = db;