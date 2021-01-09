module.exports = function auth(req, res, next) {
  if (!req.session.isAuth) {
    req.session.retUrl = req.originalUrl;
    return res.redirect('/account/login');
  }

  next();
}