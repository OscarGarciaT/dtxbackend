var express = require("express");
var router = express.Router();

// Routers

/* API Home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Dentel X - API - Prueba" });
});

// Router linking

module.exports = router;
