const express = require('express');

const userModel = require('../models/user.model');
const auth = require('../middlewares/auth.mdw');

const router = express.Router();

router.get('/', auth, async function (req, res) {
  const userList = await userModel.all();
  
  res.render('vwUser/index', {
    layout: 'admin.hbs',
    userList,
  });
});

router.get('/:id', auth, async function (req, res) {
  const id = req.params.id;
  const user = await userModel.single(id);
  if (user === null) {
    return res.redirect('/admin/user');
  }
  
  res.render('vwUser/edit', {
    layout: 'admin.hbs',
    user,
  });
});

router.get('/add', auth, async function (req, res) {
  res.render('vwUser/add');
});

router.post('/add', auth, async function (req, res) {
  const ret = await userModel.add(req.body);
  res.redirect('/admin/user');
});

router.post('/del', auth, async function (req, res) {
  const ret = await userModel.del(req.body);
  res.redirect('/admin/user');
});

router.post('/patch', auth, async function (req, res) {
  const ret = await userModel.patch(req.body);
  res.redirect('/admin/user');
});

module.exports = router;