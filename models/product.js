//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using FILE SYSTEM -----------
//:::::::::::::::::::::::::::::::::::::::::
//

// const fs = require('fs');
// const path = require('path');

// const Cart = require('./cart');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     getProductsFromFile((products) => {
//       if (this.id) {
//         const existingProductIndex = products.findIndex(
//           (prod) => prod.id === this.id
//         );
//         const updatedProducts = [...products];
//         updatedProducts[existingProductIndex] = this;
//         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//           console.log(err);
//         });
//       } else {
//         this.id = Math.random().toString();
//         products.push(this);
//         fs.writeFile(p, JSON.stringify(products), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   }
//   static deleteById(id) {
//     getProductsFromFile((products) => {
//       const product = products.find((prod) => prod.id === id);
//       const updatedProducts = products.filter((prod) => prod.id !== id);

//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }

//   static fetchAll(cb) {
//     getProductsFromFile(cb);
//   }

//   static findById(id, cb) {
//     getProductsFromFile((products) => {
//       const product = products.find((p) => p.id === id);
//       cb(product);
//     });
//   }
// };

//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using MY SQL -----------
//:::::::::::::::::::::::::::::::::::::::::
//
// const db = require('../util/database');
// const Cart = require('./cart');

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     db.execute(
//       'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }
//   static deleteById(id) {
//     //
//   }
//   static fetchAll() {
//     return db.execute('SELECT * FROM products');
//   }
//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//   }
// };

//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using SEQUELIZE -----------
//:::::::::::::::::::::::::::::::::::::::::
//
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// Define Product:
// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Product;

//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using MONGODB -----------
//:::::::::::::::::::::::::::::::::::::::::
//
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }
//   // Upload to DB ("SHOP")
//   save() {
//     const db = getDb();
//     let dbOperation;
//     if (this._id) {
//       // Update the Product values:
//       dbOperation = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       // Create and Add new Product:
//       dbOperation = db.collection('products').insertOne(this);
//     }
//     return dbOperation
//       .then((result) => {
//         // console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   // Fetch All Products:
//   static fetchAll() {
//     const db = getDb();
//     return (
//       db
//         .collection('products')
//         // FIND does not return a PROMISE, Returns a CURSOR
//         .find()
//         .toArray() // Returns a Promise, only use TOARRAY if we have a few indexes.
//         .then((products) => {
//           return products;
//         })
//         .catch((err) => console.log(err))
//     );
//   }
//   // Fetch by _ID:
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({
//         _id: new mongodb.ObjectId(prodId),
//       })
//       .next() // To get the last Document that match prodId (our product)
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }
//   // Deleting a Product:
//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log('Product Deleted');
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;

//:::::::::::::::::::::::::::::::::::::::::
//----------- Using MONGOOSE -----------
//:::::::::::::::::::::::::::::::::::::::::
//

// Importamos mongoose, Usamos el CONSTRUCTOR(Schema), Creamos un Object usando el CONSTRUCTOR
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
