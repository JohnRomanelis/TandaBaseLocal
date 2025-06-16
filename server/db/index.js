const Database = require('better-sqlite3');
const db = new Database('./tandabase.db', { verbose: console.log });
module.exports = db;