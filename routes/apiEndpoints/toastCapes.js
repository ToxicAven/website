var express = require('express');
var router = express.Router();
var app = express()

app.use(require('serve-favicon')('./public/images/favicon.ico'));

router.get('/', function(req, res) {
    res.send({"0e89f5c1-8211-49f2-bbc5-b3d88b1c91f8": "DEV"})
});

module.exports = router;