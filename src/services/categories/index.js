const express = require("express");
const Category = require("../../database").Category; //BECAUSE DATABASE/INDEX.JS IS EXPORTING A MODELS OBJECT, WE CAN CALL THE Category MODEL STRAIGHT FROM THIS OBJECT

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE
    res.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.get("/", async (req, res) => {
  try {
    const allCategorys = await Category.findAll(); //.findAll RETURNS ALL OF THE CategoryS
    res.send(allCategorys);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id); //.findByPk RETURNS THE Category WITH THE MATCHING ID
    res.send(singleCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } }); //.destroy DESTROYS ROWS. CAN DESTROY MULTIPLE BASED ON FILTER. WILL DESTRY ALL WITHOUT A FILTER
    res.send("Category destroyed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const alteredCategory = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(alteredCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send("Uh oh, something broke :(");
  }
});

module.exports = router;
