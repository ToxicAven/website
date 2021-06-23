var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('https://github.com/toxicaven/website');
});

module.exports = router;