// :::: Storaging Products :::::
// 1) Products Array to be changed into DB:
// const products = [];
//
// 2) Working with FILE SYSTEM:
const fs = require('fs');
const path = require('path');

// HELPERS:
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

// Class PRODUCT:
module.exports = class Product {
  // Give title from Req.Body to this Product
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  // :::: Storaging Products --> ARRAY <-- :::::
  // 1) Push this product to the ARRAY:
  //   save() {
  //     products.push(this); // ARRAY
  //   }
  //
  // :::: Storaging Products --> FILE SYSTEM <-- :::::

  save() {
    getProductsFromFile((products) => {
      products.push(this); // Refers to THIS CLASS.
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // 2) Will gather products from the chosen Storage Method.
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
// PULLED ALL GIT FROM COURSE TO START CLEAN:
