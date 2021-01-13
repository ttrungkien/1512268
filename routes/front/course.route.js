const express = require('express');

const courseModel = require('../../models/course.model');
const categoryModel = require('../../models/category.model');
const userModel = require('../../models/user.model');

const router = express.Router();

router.get('/detail/:id', async function (req, res) {
  const id = req.params.id;
  const course = await courseModel.single(id);

  if (course === null) {
    return;
  }

  const category = await categoryModel.single(course.categoryId);
  const lecturer = await userModel.single(course.userId);
  
  res.render('frontCourse/course-detail', {
    course,
    category,
    lecturer,
  });
});

module.exports = router;