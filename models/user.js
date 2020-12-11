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
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }
  // Add to DB:
  save() {
    const db = getDb();
    db.collection('users').insertOnce(this);
  }
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
