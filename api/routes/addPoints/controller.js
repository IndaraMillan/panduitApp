
'use strict'; 

var inputPoint = require('./../../models/Inputpoint'); 


exports.create = function(req, res) {

   inputPoint.max('id').then(function(max) {

	inputPoint.create({
		email: req.body.email,
		ir: req.body.ir,
		spa: req.body.spa,
		qty:req.body.qty,
		activity: req.body.activity


	}).then(function(inputPoint) {
		console.log(inputPoint);

		if(!inputPoint){
			return res.status(401).json({ error: 'disconnection' });
		}
		else{
			return res.status(200).json(inputPoint);

		}
	}).catch(function(err) {
		return res.status(500).json({ error: err });
	});
    });
}
