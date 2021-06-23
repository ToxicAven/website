var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send({ success: true, message: `AvenAPI`, endpoints: {uwu: `Makes a string super cute! :3`}, timestamp: Date.now()})
});

module.exports = router;
