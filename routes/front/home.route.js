const express = require('express');

const courseModel = require('../../models/course.model');
const categoryModel = require('../../models/category.model');

const router = express.Router();

router.get('/', async function (req, res) {
  const categoryList = await categoryModel.all();
  const courseList = await courseModel.all();

  let mainCategoryList = categoryList.filter(category => category.parentId === null);
  mainCategoryList = mainCategoryList.map(mainCategory => {
    const subCategoryList = categoryList.filter(category => category.parentId === mainCategory.id);
    mainCategory.children = subCategoryList;
    mainCategory.hasChildren = subCategoryList.length === 0 ? false : true;
    return mainCategory;
  });
  console.log('mainCategoryList', mainCategoryList);
  console.log('categoryList', categoryList);

  res.render('vwHome/home', {
    categoryList: mainCategoryList,
    courseList,
  });
});

module.exports = router;