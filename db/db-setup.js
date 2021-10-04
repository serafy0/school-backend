const knex = require("knex");

const knexfile = require("./knexfile");

const { Model } = require("objection");

function setupDb() {
  let db;
  if (process.env.ENV === "production") {
    db = knex(knexfile.production);
    console.log("prod");
  } else {
    db = knex(knexfile.development);
    console.log("dev");
  }
  Model.knex(db);
}
module.exports = setupDb;
