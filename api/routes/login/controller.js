
'use strict';   

var jwt = require('jsonwebtoken');                  
var User = require('./../../models/User');

var secret = 'panduitapisec';

exports.login = function(req, res) {  
  User.findOne({                   
    where: { email: req.body.email }   
  })
  .then(function(user) {         
    if (!user) {                 // if user doesn't match
      return res.status(401).json({ error: 'Usuario inválido' });
    }
    else if (req.body.password === user.get('password')) { 
      var token = jwt.sign({ user: user.get('email') }, secret, { expiresIn: '1hr' });  //we're going to take var jwt from jsonwebtoken with sing function. inside variable: variable value, var secret, {expiration time}, all together gave us a token
      return res.status(200).json({ token: token, email: user.get('email'), id: user.get("id"), role_id: user.get("role_id"), userName: user.get("userName") });    
    } 
    else {
      return res.status(401).json({ error: 'Contraseña inválida' });   //in case password is incorrect
    }
  })
  .catch(function(err) {
    return res.status(500).json({ error: err });   //return a error if something goes wrong
  });
};