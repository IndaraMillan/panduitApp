
var Sequelize = require('sequelize');

var database = new Sequelize('dashboard', 'root', '', {
	host: '127.0.0.1',
	port: 3306,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000     //time will be open port with user
	}
});

module.exports = database;   //we export our database