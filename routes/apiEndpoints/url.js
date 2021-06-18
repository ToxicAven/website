const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const zeroWidthChars = ['\u200B', '\u200C', '\u200D', '\u2060'];
const validUrl = require('valid-url');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config()
const auth = process.env.AUTH

router.get('/:urlCode', async (req, res) => {
  try {
    console.log(req.params.urlCode)
    const url = require('./urls.json').urls.find( ({ shortUrl }) => shortUrl === req.params.urlCode );

    if (!url) {
      return res.status(400).json('Invalid short URL');
    }

    return res.redirect(url.longUrl);
  } catch (erconstr) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

router.post('/api/shorten', async (req, res) => {
  const receivedAuth = req.headers["auth"];

  if (receivedAuth != auth) {
    return res.status(304).json('Invalid Auth key');
  }

  const input = req.headers["longurl"];

  //Check if long URL is valid
  if (!validUrl.isUri(input)) {
    return res.status(400).json('Invalid long URL');
  }

  try {
    let url = require('./urls.json').urls.find( ({ longUrl }) => longUrl === input );

    //Check if URL already exists
    if (url) {
      return res.send({ success: true, resource: url.shortUrl})
    } else

    //Make a url code
    var urlCode = [...randomBytes(15)].map(byte => zeroWidthChars[Number(byte) % zeroWidthChars.length]).join('').slice(1) + zeroWidthChars[0];

    let chk = require('./urls.json').urls.find( ({ shortUrl }) => shortUrl === urlCode );

    while (chk) {
      urlCode = [...randomBytes(15)].map(byte => zeroWidthChars[Number(byte) % zeroWidthChars.length]).join('').slice(1) + zeroWidthChars[0];
      chk = require('./urls.json').urls.find( ({ shortUrl }) => shortUrl === urlCode );
    }

    const returnUrl = 'https://toxicaven.dev/' + urlCode;

    require('./urls.json').urls.push({
      longUrl: input,
      shortUrl: urlCode
    });

    await fs.writeJson(path.join(__dirname, 'urls.json'), require('./urls.json'), { spaces: '\t' })
    return res.send({ success: true, resource: returnUrl})

  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
