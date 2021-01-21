const express = require("express");
const Model = require("../../utilities/model");
const Articles = new Model("articles");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const singleArticle = await Articles.findById(req.params.id);
    res.send(singleArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedArticle = await Articles.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(updatedArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newArticle = await Articles.save(req.body);
    res.send(newArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Articles.findByIdAndDelete(req.params.id);
    res.send("EXECUTED");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allArticles = await Articles.findOne(req.query);
    res.send(allArticles);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
