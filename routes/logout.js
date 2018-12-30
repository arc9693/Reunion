const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const cookie = req.cookies;
  for (const prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    res.cookie(prop, '', { expires: new Date(0) });
  }
  return res.redirect('/');
});

module.exports = router;
