var express = require('express');
var marked = require('marked');
var fs = require('fs-extra');
var path = require('path');
var router = express.Router();

router.get('/', (_req, res, next) => fs.readFile(path.join(__dirname, '1.16-utility-mods.md')).then((bytes) => bytes.toString()).then(marked).then((d) => res.render('clients', { data: d })).catch(next));

module.exports = router;
