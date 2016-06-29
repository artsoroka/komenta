var _         = require('lodash'); 
var Promise   = require('bluebird'); 
var rethinkdb = require('rethinkdbdash'); 
var config    = require('../../config');  
var database  = rethinkdb(config.db); 

var User = function(){}; 

User.prototype.login = function(username, password){
    return new Promise(function(resolve, reject){
        
        database.table('users')
            .filter({
                name: username,
                pass: password
            })
            .run()
            .then(function(users) {
                console.log(users,username, password); 
                if( _.isEmpty(users) ){
                    return reject('no user found with such credentials'); 
                }
                
                resolve(users); 
                
            }).error(function(err){
                console.log(err); 
            });
    }); 
        
}; 

module.exports = User; 