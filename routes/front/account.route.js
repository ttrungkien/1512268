const express = require('express');
const bcrypt = require('bcryptjs');

const userModel = require('../../models/user.model');

const router = express.Router();

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
    role: 'STUDENT',
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

  return res.json(false)
})

module.exports = router;