const express = require('express');
const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');

const router = express.Router();

router.get('/login', async function (req, res) {
  const ref = req.headers.referer;
  req.session.retUrl = ref;
  
  res.render('adminAuth/login', {
    layout: false,
  });
});

router.post('/login', async function (req, res) {
  const user = await userModel.singleByUsername(req.body.username);
  console.log(user);
  if (user === null) {
    return res.render('adminAuth/login', {
      err_message: 'Invalid username or password.'
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.password);
  console.log(ret);
  if (ret === false) {
    return res.render('adminAuth/login', {
      err_message: 'Invalid username or password.'
    });
  }

  if (user.role !== 'ADMIN') {
    return res.render('adminAuth/login', {
      err_message: 'User is not an admin.'
    });
  }

  req.session.isAuth = true;
  req.session.authUser = user;

  let url = req.query.retUrl || '/admin/category';
  res.redirect(url);
});

router.post('/logout', async function (req, res) {
  req.session.isAuth = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
});

module.exports = router;