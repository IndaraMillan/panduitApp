
var Inputpoint = require('./../../models/Inputpoint');      

exports.inputlist = function(req, res) {   
  Inputpoint.findAll({})                           
  .then(function(inputpoints) {
    return res.status(200).json({ inputpoints: inputpoints }); 
    return res.status(304).json({ir: inputlist.get('ir'), spa: inputlist.get('spa'), qty : inputlist.get('qty'), activity : inputlist.get('activity'), createdAt: inputlist.get('created_at')});
    
  })
  .catch(function(err) {                      
    return res.status(500).json({ error: err });    
  });
};