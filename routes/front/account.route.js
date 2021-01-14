const express = require('express');
const bcrypt = require('bcryptjs');

const userModel = require('../../models/user.model');
const auth = require('../../middlewares/auth.mdw');

const router = express.Router();

router.get('/login', async function (req, res) {
  const ref = req.headers.referer;
  req.session.retUrl = ref;
  
  res.render('vwAccount/login');
});

router.post('/login', async function (req, res) {
  const user = await userModel.singleByUsername(req.body.username);
  if (user === null) {
    return res.render('vwAccount/login', {
      err_message: 'Invalid username or password.'
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.password);
  if (ret === false) {
    return res.render('vwAccount/login', {
      err_message: 'Invalid username or password.'
    });
  }

  req.session.isAuth = true;
  req.session.authUser = user;

  let url = req.query.retUrl || '/';
  res.redirect(url);
});

router.post('/logout', async function (req, res) {
  req.session.isAuth = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
});

router.get('/register', async function (req, res) {
  res.render('vwAccount/register');
});

router.post('/register', async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = {
    username: req.body.username,
    password: hash,
    name: req.body.name,
    email: req.body.email,
    role: req.body.role || 'STUDENT',
  };

  await userModel.add(user);
  res.render('vwAccount/register');
});

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.singleByUsername(username);
  if (user === null) {
    return res.json(true);
  }

  return res.json(false);
})

router.get('/profile', auth, async function (req, res) {
  res.render('vwAccount/profile');
});

router.get('/edit', auth, async function (req, res) {
  res.render('vwAccount/edit');
});

router.post('/edit', auth, async function (req, res) {
  const ret = await userModel.patch(req.body);

  const user = await userModel.single(req.session.authUser.id);
  req.session.authUser = user;

  res.redirect('/account/profile');
});

module.exports = router;