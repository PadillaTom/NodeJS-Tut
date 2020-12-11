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
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }
  // :::::: UPLOADING :::::
  // Add to DB:
  save() {
    const db = getDb();
    db.collection('users').insertOnce(this);
  }
  // Add to Cart:
  addToCart(product) {
    //  ---> Check if the Product Exists in Cart:
    //   const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id
    // });
    // ---> Add product(properties) + qty: 1
    const updatedCart = {
      items: [{ ...product, quantity: 1 }],
    };
    //  --> Relate Cart to User: USER will hold a CART OBJECT
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  // ::::: FINDING :::::
  // Find by Id:
  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
    // .next() // To get the "next" item (our user) o usar directamente findOne
  }
}
module.exports = User;
