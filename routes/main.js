var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
  res.render('test');
});

router.get('/about', function(req, res, next) {
	res.render('about');
});

router.get('/contact', function(req, res, next) {
	res.render('contact');
});

router.get('/yes', function(req, res, next) {
	res.render('yes');
});

router.get('/source', function(req, res, next) {
	res.redirect('https://github.com/toxicaven/website');
  });

router.get('/trollcrazy', function(req, res, next) {
	res.render('troll');
});

router.get('/kirby', function(req, res, next) {
	res.render('karbi');
});

module.exports = router;