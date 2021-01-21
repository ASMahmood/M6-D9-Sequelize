const express = require("express");
const Review = require("../../database").Review; //BECAUSE DATABASE/INDEX.JS IS EXPORTING A MODELS OBJECT, WE CAN CALL THE Review MODEL STRAIGHT FROM THIS OBJECT
const Author = require("../../database").Author;
const Article = require("../../database").Article;
const Category = require("../../database").Category;

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newReview = await Review.create(req.body); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE
    res.status(201).send(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.get("/", async (req, res) => {
  try {
    const allReviews = await Review.findAll({
      include: [Author, Article],
    }); //.findAll RETURNS ALL OF THE ReviewS
    res.send(allReviews);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleReview = await Review.findByPk(req.params.id, {
      include: [Author, Article],
    }); //.findByPk RETURNS THE Review WITH THE MATCHING ID
    res.send(singleReview);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Review.destroy({ where: { id: req.params.id } }); //.destroy DESTROYS ROWS. CAN DESTROY MULTIPLE BASED ON FILTER. WILL DESTRY ALL WITHOUT A FILTER
    res.send("Review destroyed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const alteredReview = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(alteredReview);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

module.exports = router;
