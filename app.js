const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// :::::::::::::::::::::::::::
// Databases ---->
// :::::::::::::::::::::::::::

//  SEQUELIZE --->
// const db = require('./util/database'); // My SQL
// const sequelize = require('./util/database'); // Sequelize
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');
//
// MONGO DB --->
// Controllers:
const errorController = require('./controllers/error');
// Run Method to be Connected to MONGO DB :
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');

const app = express();

// Template Engine:
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes:
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//   //
//   // ::: MYSQL :::
//   // User.findByPk(1)
//   //   .then((user) => {
//   //     req.user = user; // --> We set a SEQUELIZE Object for the user REQ(we have all methods and functions for it)
//   //     next();
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
//   //
//   // ::: MONGODB :::
//   // User.findById('5fd352d904cc6677d0bbc8e6')
//   //   .then((user) => {
//   //     req.user = new User(user.name, user.email, user.cart, user._id);
//   //     next();
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://tom:asdasd123@node-tut.ac97t.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//:::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::: SEQUELIZE ::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::
//
// :::::ASSOCIATIONS SQL:::::
// // product-user -->
// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// // user-cart -->
// User.hasOne(Cart);
// Cart.belongsTo(User);
// // cart-products -->
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// // order-user -->
// Order.belongsTo(User);
// User.hasMany(Order);
// // order-products -->
// Order.belongsToMany(Product, { through: OrderItem });
// //
// // Sequelize SYNC:
// sequelize
//   // .sync({ force: true }) // --> To relate and REcreate by FORCE the PRODUCT and USER
//   .sync()
//   .then((result) => {
//     return User.findByPk(1); // --> Pasamoss un USER a la fuerza
//   })
//   .then((user) => {
//     if (!user) {
//       // --> Si NO EXISTE user para pasar.... CREAMOS
//       User.create({
//         name: 'Tom',
//         email: 'Test@test.com',
//       });
//     }
//     return user; // --> Salimos de dicha Promise con el user creado
//   })
//   .then((user) => {
//     user.createCart(); // --> Si HAY USER: Creamos Cart
//   })
//   .then((cart) => {
//     app.listen(3000); // --> if USER and CART --> Corremos Server
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// :::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::: MONGO DB ::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::
//

// mongoConnect(() => {
//   app.listen(3000);
// });
