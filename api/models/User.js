
'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database.js');  //here, we import our data base

var User = database.define('user', {      //from database we search for table
	id: {
		type: Sequelize.INTEGER,   
		primaryKey: true        //we made it primary key on PHPmyadmin
	},
	email: {
		type: Sequelize.STRING,    
		validate : { 
			isEmail : true   	 
		}
	},
	password: {
		type: Sequelize.STRING       
	},
	role_id: {
		type: Sequelize.INTEGER,    
		field: 'role_id'
	},
	
	userName: {
		type: Sequelize.STRING,      
		field: 'userName'
	}

}, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = User;         //export user information from data base