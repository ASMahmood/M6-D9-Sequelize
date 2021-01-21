const { query } = require("express");
const { Pool } = require("pg"); //GETS THE POOL CLASS(???) FROM PG
const pool = new Pool(); //creates a new instance of the pool class

module.exports = {
  async query(text, params) {
    const startOfQuery = Date.now();
    const response = await pool.query(text, params);
    const durationOfQuery = Date.now() - startOfQuery;
    console.info("The query took " + durationOfQuery + " milliseconds");
    return response;
  },
  pool,
};
