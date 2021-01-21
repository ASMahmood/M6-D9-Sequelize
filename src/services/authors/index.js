const express = require("express");
const Author = require("../../database").Author; //BECAUSE DATABASE/INDEX.JS IS EXPORTING A MODELS OBJECT, WE CAN CALL THE AUTHOR MODEL STRAIGHT FROM THIS OBJECT

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE
    res.status(201).send(newAuthor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

module.exports = router;
