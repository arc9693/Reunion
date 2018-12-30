const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.get('/', (req, res, next) => {
  const message = '';
  res.render('login', { message });
});

router.post('/', (req, res, next) => {
  const data = req.body;
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .max(30)
      .required(),
  });
  // validate the request data against the schema
  Joi.validate(data, schema, (err, value) => {
    if (err) {
      // send a 422 error response if validation fails
      res.status(422).render('login', { message: 'Invalid data' });
    } else {
      const email = req.body.email;
      const password = req.body.password;
      db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results, fields) => {
          if (error) {
            res.status(400).render('login', { message: 'Error locating data' });
          } else {
            console.log('The solution is: ', results.length);
            if (results.length > 0) {
              // bcypt compare
              bcrypt.compare(password, results[0].password, (err, result) => {
              //  console.log(result);
                if (result) {
                  req.session.userId = results[0].id;
                  req.session.user = results[0];
                  //    console.log(results[0].id);
                  return res.status(200).redirect('/dashboard');
                }
                return res.render('login', {
                  message: 'Invalid user name or password',
                });
              });
            } else {
              const message = 'Email does not exists';
              return res.render('login', { message });
            }
          }
        },
      );
    }
  });
});

module.exports = router;
