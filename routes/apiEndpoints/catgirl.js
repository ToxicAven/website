var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/catgirls/'+ (Math.floor(Math.random() * 151) + 1) + `.png`)
});

module.exports = router;
