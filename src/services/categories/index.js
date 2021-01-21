const express = require("express");
const Model = require("../../utilities/model");
const Categories = new Model("categories");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const singleCategory = await Categories.findById(req.params.id);
    res.send(singleCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Categories.save(req.body);
    res.send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.send("EXECUTED");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allCategories = await Categories.findOne(req.query);
    res.send(allCategories);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/count/all", async (req, res) => {
  try {
    const allCategories = await Categories.countCategories();
    res.send(allCategories);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
