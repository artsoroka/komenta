var rethinkdb = require('rethinkdbdash'); 
var config    = {
    host: '188.166.48.168', 
    port: 28015
}; 

var database = rethinkdb(config); 

database
    .dbCreate('testapp')
    .run()
    .then(function(status){
        console.log('DB %s created', 'testapp'); 
        return database.db('testapp').tableCreate('users').run()
    })
    .then(function(status){
        console.log('table %s created', 'users'); 
    })
    .error(function(err){
        console.log(err); 
    });  