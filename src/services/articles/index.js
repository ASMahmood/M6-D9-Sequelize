const express = require("express");
const Article = require("../../database").Article; //BECAUSE DATABASE/INDEX.JS IS EXPORTING A MODELS OBJECT, WE CAN CALL THE Article MODEL STRAIGHT FROM THIS OBJECT
const Author = require("../../database").Author;
const Review = require("../../database").Review;
const Category = require("../../database").Category;

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newArticle = await Article.create(req.body); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE
    res.status(201).send(newArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.get("/", async (req, res) => {
  try {
    const allArticles = await Article.findAll({
      include: [Author, Review, Category],
    }); //.findAll RETURNS ALL OF THE ArticleS. include:[] IS AN ARRAY THAT CONNECTS MODELS WITH THE REQUEST. THIS IS DONE SO AUTHORID CAN GET THE CORRESPONDING AUTHOR OBJECT
    res.send(allArticles);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleArticle = await Article.findByPk(req.params.id, {
      include: [Author, Review, Category],
    }); //.findByPk RETURNS THE Article WITH THE MATCHING ID
    res.send(singleArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Article.destroy({ where: { id: req.params.id } }); //.destroy DESTROYS ROWS. CAN DESTROY MULTIPLE BASED ON FILTER. WILL DESTRY ALL WITHOUT A FILTER
    res.send("Article destroyed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const alteredArticle = await Article.update(req.body, {
      where: { id: req.params.id },
      include: [Author, Review, Category],
      returning: true,
    });
    res.send(alteredArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

module.exports = router;
