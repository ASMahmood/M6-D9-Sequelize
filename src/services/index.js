const express = require("express");

const router = express.Router();
const articlesRoute = require("./articles");
const categoriesRoute = require("./categories");
const authorsRoute = require("./authors");
const reviewsRoute = require("./reviews");

router.use("/articles", articlesRoute);
router.use("/categories", categoriesRoute);
router.use("/authors", authorsRoute);
router.use("/reviews", reviewsRoute);

module.exports = router;
