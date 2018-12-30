const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

/* GET users listing. */
router.get('/', (req, res, next) => {
  let user = req.session.user;

  const userId = req.session.userId;

  if (userId == null) {
    res.redirect('/');
    return;
  }

  const sql = `SELECT * FROM \`users\` WHERE \`id\`='${userId}'`;

  db.query(sql, (err, results) => {
    user = results[0];
    res.render('dashboard.ejs', { message: null, user });
  });
});

router.post('/', (req, res, next) => {
  let user = req.session.user;
  const userId = req.session.userId;

  if (userId == null) {
    res.redirect('/');
    return;
  }

  const sql = `SELECT * FROM \`users\` WHERE \`id\`='${userId}'`;

  db.query(sql, (err, results) => {
    user = results[0];
  });
  // console.log(user);
  const schema = Joi.object().keys({
    new_password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .max(30)
      .required(),
    old_password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .max(30)
      .required(),
  });
  console.log(req.body);
  // validate the request data against the schema
  Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      console.log('validation failed');
      // send a 422 error response if validation fails
      res.status(422).render('dashboard', { message: 'Invalid data', user });
    } else {
      bcrypt.compare(req.body.old_password, user.password, (err, result) => {
      //  console.log(result);
        if (result) {
          bcrypt.hash(req.body.new_password, 10, (err, hash) => {
            db.query('UPDATE users SET password = ? where email = ?', [hash, user.email], (error, results, fields) => {
              if (error) {
                const message = 'Error changing password';
                console.log('error ocurred', error);
                res
                  .status(400)
                  .render('dashboard', { message, user });
              } else {
                return res.status(200).render('dashboard', { message: 'Password updated successfully', user });
              }
            });
          });
        } else {
          return res.render('dashboard', {
            message: 'Invalid old password',
            user,
          });
        }
      });
    }
  });
});
module.exports = router;
