// Products Array to be changed into DB:
const products = [];

module.exports = class Product {
  // Give title from Req.Body to this Product
  constructor(title) {
    this.title = title;
  }
  //   Push this product to the ARRAY:
  save() {
    products.push(this);
  }
  //   Will gather products fron the Array.
  static fetchAll() {
    return products;
  }
};
