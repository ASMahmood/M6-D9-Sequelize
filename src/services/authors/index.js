const express = require("express");
const Author = require("../../database").Author; //BECAUSE DATABASE/INDEX.JS IS EXPORTING A MODELS OBJECT, WE CAN CALL THE AUTHOR MODEL STRAIGHT FROM THIS OBJECT
const Review = require("../../database").Review;

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

router.get("/", async (req, res) => {
  try {
    const allAuthors = await Author.findAll({ include: [Review] }); //.findAll RETURNS ALL OF THE AUTHORS
    res.send(allAuthors);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleAuthor = await Author.findByPk(req.params.id); //.findByPk RETURNS THE AUTHOR WITH THE MATCHING ID
    res.send(singleAuthor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Author.destroy({ where: { id: req.params.id } }); //.destroy DESTROYS ROWS. CAN DESTROY MULTIPLE BASED ON FILTER. WILL DESTRY ALL WITHOUT A FILTER
    res.send("Author destroyed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const alteredAuthor = await Author.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(alteredAuthor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

module.exports = router;
