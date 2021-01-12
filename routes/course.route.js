const express = require('express');

const courseModel = require('../models/course.model');
const categoryModel = require('../models/category.model');
const userModel = require('../models/user.model');
const auth = require('../middlewares/auth.mdw');

const router = express.Router();

router.get('/', auth, async function (req, res) {
  const courseList = await courseModel.all();
  
  res.render('adminCourse/index', {
    layout: 'admin.hbs',
    courseList,
  });
});

router.get('/detail/:id', auth, async function (req, res) {
  const id = req.params.id;
  const course = await courseModel.single(id);
  const categoryList = await categoryModel.all();
  const userList = await userModel.all();
  if (course === null) {
    return res.redirect('/admin/course');
  }
  
  res.render('adminCourse/edit', {
    layout: 'admin.hbs',
    course,
    categoryList,
    userList,
  });
});

router.get('/add', auth, async function (req, res) {
  const categoryList = await categoryModel.all();
  const lecturerList = await userModel.lecturers();
  
  res.render('adminCourse/add', {
    categoryList,
    lecturerList,
  });
});

router.post('/add', auth, async function (req, res) {
  const ret = await courseModel.add(req.body);
  res.redirect('/admin/course');
});

router.post('/del', auth, async function (req, res) {
  const ret = await courseModel.del(req.body);
  res.redirect('/admin/course');
});

router.post('/patch', auth, async function (req, res) {
  const ret = await courseModel.patch(req.body);
  res.redirect('/admin/course');
});

module.exports = router;