var express = require("express");
var router = express.Router();

const { Pool } = require("pg");
const config = require("../config");
const pool = new Pool(config.db);

// async function query(query, params) {
//   const { rows, fields } = await pool.query(query, params);
//   console.log("pool");
//   return rows;
// }

/* GET home page. */
router.get("/", function (req, res, next) {
  // query();
  // console.log("vfvfdg", pool);
  res.json({ message: "alive" });
});

module.exports = router;
