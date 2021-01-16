module.exports = function(app) {
  app.use('/account', require('../routes/front/account.route'));
  app.use('/course', require('../routes/front/course.route'));
  app.use('/admin/auth', require('../routes/auth.route'));
  app.use('/admin/user', require('../routes/user.route'));
  app.use('/admin/category', require('../routes/category.route'));
  app.use('/admin/course', require('../routes/course.route'));
  app.use('/admin', require('../routes/home.route'));
  app.use('/', require('../routes/front/home.route'));
};