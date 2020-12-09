const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//
// Databases ---->
//
// const db = require('./util/database'); // My SQL
const sequelize = require('./util/database'); // Sequelize

// Controllers:
const errorController = require('./controllers/error');

const app = express();

// Template Engine:
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes:
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// Sequelize:
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(3000);
