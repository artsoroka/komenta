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
                    return resolve(null); 
                }
                
                if( users.length > 1 ){
                    console.log('found more then one record with username %s', username); 
                }
                
                resolve(_.first(users)); 
                
            }).error(function(err){
                console.log(err); 
            });
    }); 
        
}; 

module.exports = User; 