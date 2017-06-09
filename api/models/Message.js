'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database.js');  

var Message = database.define('message', { 
	id: {
		type: Sequelize.INTEGER,  
		autoIncrement: true,
		primaryKey: true
	},

	message: {
		type: Sequelize.STRING,    

	}


}, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = Message;    