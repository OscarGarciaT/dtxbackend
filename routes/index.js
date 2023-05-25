var express = require('express');
var router = express.Router();

// Routers

/* API Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Router linking

module.exports = router;
