const { Sequelize, DataTypes } = require("sequelize");
const Author = require("./author");

const sequelize = new Sequelize( //AUTHORIIZES AND STARTS SEQUELIZE
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres", //THIS IS THE LANGUAGE THAT WE ARE USING WITH SEQUELIZE
  }
);

const models = {
  //MODELS OF THE TABLES
  Author: Author(sequelize, DataTypes),
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate() //TESTS IF SEQUELIZE IS CONNECTED TO OUR DATABASE
  .then(() =>
    console.log(
      "------------------------------------------ Connection established ------------------------------------------"
    )
  )
  .catch((e) => {
    console.log(
      "------------------------------------------ Connection failed ------------------------------------------"
    ),
      console.log(e);
  });

module.exports = models; //EXPORTS TABLE MODELS TO SERVER.JS
