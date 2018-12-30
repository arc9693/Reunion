var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // some message
  const message = '';

  const user = req.session.user;
  res.render('index', { message, user });
});

module.exports = router;
