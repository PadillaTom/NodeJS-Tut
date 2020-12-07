const fs = require('fs');
const path = require('path');

// HELPERS:
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //  Fetch The previous Cart:
    fs.readFile(p, (err, data) => {
      // Create Cart:
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
    });
    // Analyze the cart -> Find existing Products:
    const existingProductIndex = cart.products.findIndex(
      (prod) => prod.id === id
    );
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;
    // Add new Product / increase Quantity:
    if (existingProduct) {
      // IF --> Id already exist in Array:
      updatedProduct = { ...existingProduct };
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      // Else --> Add new product
      updatedProduct = { id: id, qty: 1 };
      cart.products = [...cart.products, updatedProduct];
    }
    // Total Price:
    cart.totalPrice = cart.totalPrice + productPrice;
    fs.writeFile(p, JSON.stringify(cart), (err) => {
      console.log(err);
    });
  }
};
