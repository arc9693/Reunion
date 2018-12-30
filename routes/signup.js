const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.get('/', (req, res, next) => {
  const message = '';
  const user = req.session.user;
  res.render('signup', { message, user });
});

router.post('/', (req, res) => {
  const data = req.body;
  console.log(data);
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .max(30)
      .required(),
    first_name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    last_name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
  });
  // validate the request data against the schema
  Joi.validate(data, schema, (err, value) => {
    if (err) {
      // send a 422 error response if validation fails
      res
        .status(422)
        .render('signup', { message: 'Invalid data', user: req.session.user });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        const today = new Date();
        const users = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
          created: today,
          modified: today,
        };
        db.query('INSERT INTO users SET ?', users, (error, results, fields) => {
          if (error) {
            let message = 'Error registering user';
            //    console.log('error ocurred', error);
            if (error.errno == 1062) message = 'This email is already registerd.';
            res
              .status(400)
              .render('signup', { message, user: req.session.user });
          } else {
            //      console.log('The solution is: ', results);
            req.session.userId = results.insertId;
            //    console.log(results.insertId);
            return res.status(200).redirect('/dashboard');
          }
        });
      });
    }
  });
});

module.exports = router;
