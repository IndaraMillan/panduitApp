
'use strict';

var Sequelize = require('sequelize');
var database = require('./../services/database.js'); 

var Inputpoint = database.define('inputpoint', {  
	id: {
		type: Sequelize.INTEGER, 
		autoIncrement: true,
		primaryKey: true     
	},
	email: {
		type: Sequelize.STRING,    
		validate : { 
			isEmail : true   
		}

	},
	ir: {
		type: Sequelize.INTEGER,   
		validate : { 
			isNumeric : true   
		}

	},
	spa: {
		type: Sequelize.STRING, 
		validate : { 
			isAlphanumeric : true  
		}

	},
	qty: {
		type: Sequelize.INTEGER, 
		validate : { 
			isNumeric : true 	 
		}

	},
	activity: {
		type: Sequelize.STRING, 

	}


}, { createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = Inputpoint; 