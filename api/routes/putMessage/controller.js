
'use strict'; 

var message = require('./../../models/Message'); 


exports.create = function(req, res) {

   message.max('id').then(function(max) {

	message.create({

		message: req.body.message

	}).then(function(message) {

		if(!message){
			return res.status(401).json({ error: 'disconnection' });
		}
		else{
			return res.status(200).json(message);

		}
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
    });
}