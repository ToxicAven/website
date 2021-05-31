var express = require('express');
var router = express.Router();
var app = express()

app.use(require('serve-favicon')('./public/images/favicon.ico'));

router.get('/', function(req, res) {
    res.send({ success: true, message: `AvenAPI`, endpoints: {/*catgirl: `Random catgirl! uwu`, */uwu: `Makes a string super cute! :3`}, timestamp: Date.now()})
});

/*
router.get('/catgirl', function(req, res) {
    res.send({ success: true, url: `localhost:3000/catgirls/` + (Math.floor(Math.random() * 152) + 1) + `.png` })
});
*/

module.exports = router;