require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../db/connection.js');

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(`-> Loading Schema Files ...`);
  const schemaDirectory = path.join(__dirname, '../db/schema');
  const schemaFilenames = fs.readdirSync(schemaDirectory);

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(path.join(schemaDirectory, fn), 'utf8');
    console.log(`\t-> Running ${fn}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(`-> Loading Seeds ...`);
  const seedDirectory = path.join(__dirname, '../db/seeds');
  const schemaFilenames = fs.readdirSync(seedDirectory);

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(path.join(seedDirectory, fn), 'utf8');
    console.log(`\t-> Running ${fn}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    await runSeedFiles();
    process.exit();
  } catch (err) {
    console.error(`Failed due to error: ${err}`);
    process.exit();
  }
};

runResetDB();
