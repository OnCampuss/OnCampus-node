const pgp = require("pg-promise")();
const { join } = require("node:path")


const connection = {
  host: 'localhost',
  port: 5432,
  database: 'oncampusNode',
  user: 'postgres',
  password: 'postgres'
};

const db = pgp(connection);

const filePath = join(__dirname, "create-tables.sql")
const query = new pgp.QueryFile(filePath)
db.query(query)

module.exports = db;

// //TESTE DE CONEXÃO DB
// db.query("SELECT 1 + 1 AS result").then((result) => console.log(result));
