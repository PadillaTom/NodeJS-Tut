//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using FILE SYSTEM -----------
//:::::::::::::::::::::::::::::::::::::::::
//
// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'cart.json'
// );

// module.exports = class Cart {
//   // ADD PRODUCTS -------->
//   static addProduct(id, productPrice) {
//     // Fetch the previous cart
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
//       // Analyze the cart => Find existing product
//       const existingProductIndex = cart.products.findIndex(
//         (prod) => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       // Add new product/ increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//     });
//   }
//   // DELETE ------->
//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, data) => {
//       if (err) {
//         return;
//       }
//       const updatedCart = { ...JSON.parse(data) };
//       const product = updatedCart.products.findIndex((prod) => prod.id === id);
//       if (!product) {
//         return;
//       }
//       const productQty = product.qty;
//       updatedCart.products = updatedCart.products.filter(
//         (prod) => prod.id !== id
//       );
//       updatedCart.totalPrice =
//         updatedCart.totalPrice - productPrice * productQty;
//       fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//         console.log(err);
//       });
//     });
//   }
//   // FETCH CART ITEMS -------->
//   static getCart(cb) {
//     fs.readFile(p, (err, data) => {
//       const cart = JSON.parse(data);
//       if (err) {
//         cb(null);
//       } else {
//         cb(cart);
//       }
//     });
//   }
// };

//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using SEQUELIZE -----------
//:::::::::::::::::::::::::::::::::::::::::
//
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Cart = sequelize.define('cart', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
// });

//
//:::::::::::::::::::::::::::::::::::::::::
//----------- Using MONGODB -----------
//:::::::::::::::::::::::::::::::::::::::::
//
// NO NEED TO HAVE A CART MODEL, WILL BE CREATED VIA USER MODEL

// module.exports = Cart;
