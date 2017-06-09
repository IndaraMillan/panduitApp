var Message = require('./../../models/Message');   

exports.messagelist = function(req, res) {  
  Message.findAll({})                   
  .then(function(message) {
    //return res.status(200).json({ message: message });  
    return res.status(304).json({message: messagelist.get('message'), createdAt: message.get('created_at')});
    
  })
  .catch(function(err) {                               
    return res.status(500).json({ error: err }); 
  });
};