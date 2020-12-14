//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using SEQUELIZE -----------
//:::::::::::::::::::::::::::::::::::::::::
//

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING,
// });

//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using MONGO DB -----------
//:::::::::::::::::::::::::::::::::::::::::
//
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = id;
//   }

//   // :::::: UPLOADING :::::
//   // Add to DB:
//   save() {
//     const db = getDb();
//     db.collection('users').insertOnce(this);
//   }

//   // Add to Cart:
//   addToCart(product) {
//     //  ---> Check if the Product Exists in Cart:
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       // SI EXISTE: Sumamos Qty y La asignamos a dicho Producto
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       // SI NO EXISTE: Agregamos dicho producto al Array
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }
//     // ---> Asociamos producto a la variable para luego save it to DB
//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     //  --> Relate Cart to User: USER will hold a CART OBJECT
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   // Post Order:
//   addOrder() {
//     const db = getDb();
//     // Fetcheamos CART para la INFO deseada de EACH PRODUCT:
//     return this.getCart()
//       .then((products) => {
//         // Creamos Formato de ORDER:
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name,
//           },
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then((result) => {
//         // Vaciamos Cart
//         this.cart = { items: [] };
//         // Update DB:
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .catch((err) => console.log(err));
//   }

//   // ::::: FETCHING :::::
//   // Find by Id:
//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then((user) => {
//         return user;
//       })
//       .catch((err) => console.log(err));
//     // .next() // To get the "next" item (our user) o usar directamente findOne
//   }

//   // Get Cart:
//   getCart() {
//     const db = getDb();
//     // Creamos Array para alojar los IDS de los prods dentro del cart
//     const productIds = this.cart.items.map((each) => {
//       return each.productId;
//     });
//     // Pedimos dichos IDS dentro de products (devuelve la data de los products)
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((each) => {
//           return {
//             ...each,
//             quantity: this.cart.items.find((item) => {
//               return item.productId.toString() === each._id.toString();
//             }).quantity,
//           };
//         });
//       });
//   }

//   // Get Orders:
//   getOrders() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({
//         'user._id': new ObjectId(this._id),
//       })
//       .toArray();
//   }

//   // ::::: DEKETING / REMOVING :::::
//   // Remove from Cart:
//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       // TRUE = Keep Itemin ARRAY , FALSE = Remove It from ARRAY
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     //  Accessing DB, update Cart->Items-> all items but the one matching ID
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }
// }
// module.exports = User;

//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using MONGOOSE -----------
//:::::::::::::::::::::::::::::::::::::::::
//

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});
module.exports = mongoose.model('User', userSchema);
