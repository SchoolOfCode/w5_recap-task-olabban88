import pg from "pg";
import * as config from "../config.js";

const pool = new pg.Pool(
  { 
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
  ssl: { rejectUnauthorized: false}
}
);

function query(text, params) {
    return pool.query(text, params )
}

export default query;