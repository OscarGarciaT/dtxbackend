var express = require("express");
var router = express.Router();
// Routers
const patientRouter = require("./patientRouter");
const userRouter = require("./userRouter");

/* API Home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Dentel X - API" });
});

// Router linking
router.use("/patients", patientRouter);
router.use("/users", userRouter);

module.exports = router;
