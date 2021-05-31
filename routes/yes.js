var express = require('express');
var router = express.Router();
var app = express();

app.use(require('serve-favicon')('./public/images/favicon.ico'));

router.get('/', function(req, res, next) {
  res.render('yes');
});

module.exports = router;