const express = require('express');

const auth = require('../middlewares/auth.mdw');

const router = express.Router();

router.get('/', auth, async function (req, res) {
  res.render('vwHome/home_admin', {
    layout: 'admin.hbs',
  });
});

module.exports = router;