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

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-tut', 'root', 'asdasd123', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
