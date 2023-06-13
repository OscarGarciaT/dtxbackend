var express = require("express");
var router = express.Router();
// Routers
const patientRouter = require("./patientRouter");

/* API Home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Dentel X - API" });
});

// Router linking
router.use("/patients", patientRouter);

module.exports = router;
