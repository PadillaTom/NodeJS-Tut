//
// ::::::::::::::: Connecting to MYSQL :::::::::::::::
//
// const mysql = require('mysql2');
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-tut',
//   password: 'asdasd123',
// });
// module.exports = pool.promise();

//
// ::::::::::::::: Using SEQUELIZE :::::::::::::::
//
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('node-tut', 'root', 'asdasd123', {
//   dialect: 'mysql',
//   host: 'localhost',
// });
// module.exports = sequelize;

//
// ::::::::::::::: Using MONGODB :::::::::::::::
//

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

// Create a Method
const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://tom:asdasd123@node-tut.ac97t.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
    }
  )
    .then((client) => {
      console.log('Connected');
      _db = client.db('shop'); // --> Connection to my DB(NAME)
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db; // --> Acces to my connected DB
  }
  throw 'No DB Found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
