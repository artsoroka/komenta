var _         = require('lodash'); 
var express   = require('express'); 
var router    = express.Router(); 
var User      = require('../models/user'); 
var Joi       = require('joi'); 
var userLogin = require('../schema/userLogin'); 

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

router.get('/login', function(req,res){
   res.render('auth/login');  
}); 

router.post('/login', urlencodedParser, function(req,res){

    Joi.validate(req.body, userLogin, function (err, data) {
        if( err ){
            return res.status(400).send(_.first(err.details).message); 
        }
        
        var user = new User(); 
        user
            .login(data.username, data.password)
            .then(function(user){
                
                if( ! user ){
                    throw Error('no user found with such credentials'); 
                }
                
                req.session.user = user; 
                res.json(user);  
            })
            .catch(function(err){
                res.send(err.message); 
            }); 
        
    }); 
    
}); 

router.all('/logout', function(req,res){
    req.session.destroy();  
    res.send('bye bye'); 
}); 

module.exports = router; 