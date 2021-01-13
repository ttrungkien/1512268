const express = require('express');

const courseModel = require('../../models/course.model');
const categoryModel = require('../../models/category.model');

const router = express.Router();

router.get('/', async function (req, res) {
  const categoryList = await categoryModel.all();
  const courseList = await courseModel.all();

  res.render('vwHome/home', {
    categoryList,
    courseList,
  });
});

module.exports = router;