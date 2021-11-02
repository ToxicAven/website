const fetch = require('node-fetch')
const express = require('express');
const router = express.Router();

router.get('/api/getlastfm', async (req, res) => {
  var response = await fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=ToxicAven&api_key="+process.env.LASTFM+"&format=json", { 
    method: 'GET'
  })
  var j = await response.json()
  res.json(j)
});

module.exports = router;