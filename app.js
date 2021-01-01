const express = require('express');
require('express-async-errors');

const app = express();

app.use(express.urlencoded({
  extended: true,
}));

require('./middlewares/view.mdw')(app);
require('./middlewares/routes.mdw')(app);
require('./middlewares/error.mdw')(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});