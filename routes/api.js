var express = require('express');
var router = express.Router();
var app = express()

app.use(require('serve-favicon')('./public/images/favicon.ico'));

router.get('/', function(req, res) {
    res.send({ success: true, message: `AvenAPI`, endpoints: {uwu: `Makes a string super cute! :3`}, timestamp: Date.now()})
});

module.exports = router;
