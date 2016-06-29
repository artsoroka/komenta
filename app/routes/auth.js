var express = require('express'); 
var router  = express.Router(); 
var User    = require('../models/user'); 

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

router.get('/login', function(req,res){
   res.render('auth/login');  
}); 

router.post('/login', urlencodedParser, function(req,res){
    var data = req.body      || {}; 
    var name = data.login    || null; 
    var pswd = data.password || null; 
    
    var user = new User(); 
    user
        .login(name, pswd)
        .then(function(user){
            req.session.user = user; 
            res.json(user);  
        })
        .catch(function(err){
            res.send(err); 
        }); 
    
}); 

router.all('/logout', function(req,res){
    req.session.destroy();  
    res.send('bye bye'); 
}); 

module.exports = router; 