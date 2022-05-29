import query from "../index.js";

const sqlStr = `CREATE TABLE IF NOT EXISTS cats (id SERIAL PRIMARY KEY, name TEXT, human TEXT, hobby TEXT);`;

async function createCatsTable() {
  const res = await query(sqlStr);
  console.log(res);
}

createCatsTable();