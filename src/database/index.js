const { Sequelize, DataTypes } = require("sequelize");
const Author = require("./author");
const Category = require("./category");
const Review = require("./review");
const Article = require("./article");

const sequelize = new Sequelize( //AUTHORIIZES AND STARTS SEQUELIZE
  process.env.PGDATABASE, //DATABASE NAME
  process.env.PGUSER, //PG USERNAME
  process.env.PGPASSWORD, //PG PASSWORD
  {
    host: process.env.PGHOST, //HOST NAME
    dialect: "postgres", //THIS IS THE LANGUAGE THAT WE ARE USING WITH SEQUELIZE
  }
);

const models = {
  //MODELS OF THE TABLES
  Author: Author(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
  Article: Article(sequelize, DataTypes),
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
