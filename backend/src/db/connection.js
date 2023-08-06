const { Pool } = require('pg');
require('dotenv').config();

console.log(process.env.PGHOST);
console.log(process.env.PGDATABASE);
console.log(process.env.PGUSER);
console.log(process.env.PGPASSWORD);
console.log(process.env.PGPORT);
console.log(process.env.DATABASE_URL);

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