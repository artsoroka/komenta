var express    = require('express'); 
var formidable = require('formidable'); 
var app        = express(); 
var session    = require('./lib/session'); 
var config     = require('../config'); 

var auth = require('./routes/auth'); 

app.use(session); 

app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views');

var authRequired = function(req,res,next){
    if( ! req.session || ! req.session.user){
        return res.send('auth required'); 
    }
    next(); 
}; 

app.get('/', function(req,res){
    res.render('mainpage'); 
}); 

app.get('/home', authRequired, function(req,res){
    res.send('home'); 
}); 

app.use('/auth', auth); 

app.all('*', function(req,res){
    
    var form   = formidable.IncomingForm();
    var files  = [];
    var fields = []; 
    
    form.encoding       = 'utf-8';
    form.uploadDir      = config.app.uploadDir 
    form.keepExtensions = true;
    form.multiples      = true; 
    
    form.parse(req, function(err, fields, files) {
        if( err ) {
            console.log('file upload error', err); 
            return res.send('error while uploading a file');    
        }

        res.json({
            form: fields, 
            files: files
        }); 

    }); 
    
}); 

module.exports = app; 