const express = require('express');

const categoryModel = require('../models/category.model');
const auth = require('../middlewares/auth.mdw');

const router = express.Router();

router.get('/', auth, async function (req, res) {
  const categoryList = await categoryModel.all();
  
  res.render('vwCategory/index', {
    layout: 'admin.hbs',
    categoryList,
  });
});

router.get('/detail/:id', auth, async function (req, res) {
  const id = req.params.id;
  const category = await categoryModel.single(id);
  const categoryList = await categoryModel.all();
  if (category === null) {
    return res.redirect('/admin/category');
  }
  
  res.render('vwCategory/edit', {
    layout: 'admin.hbs',
    category,
    categoryList,
  });
});

router.get('/add', auth, async function (req, res) {
  const categoryList = await categoryModel.all();
  
  res.render('vwCategory/add', {
    categoryList,
  });
});

router.post('/add', auth, async function (req, res) {
  const ret = await categoryModel.add(req.body);
  res.redirect('/admin/category');
});

router.post('/del', auth, async function (req, res) {
  const ret = await categoryModel.del(req.body);
  res.redirect('/admin/category');
});

router.post('/patch', auth, async function (req, res) {
  const ret = await categoryModel.patch(req.body);
  res.redirect('/admin/category');
});

module.exports = router;