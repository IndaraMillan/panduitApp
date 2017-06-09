
'use strict';

var User = require('./../../models/User');      //WE USE USER MODEL

exports.list = function(req, res) {       
  User.findAll({})                             //we want to find all users
  .then(function(users) {
    return res.status(200).json({ users: users });   //return status 200, all users
  })
  .catch(function(err) {                                //if something goes wrong....
    return res.status(500).json({ error: err });        // retrun status 500 and show error
  });
};

