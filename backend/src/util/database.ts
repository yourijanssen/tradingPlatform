import * as mysql from "mysql2/promise";

let poolConfig = {
  host: "localhost",
  user: "youri",
  password: "youri",
  database: "trader",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export let pool = mysql.createPool(poolConfig);
