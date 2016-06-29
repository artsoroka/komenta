var redis       = require('redis');
var session     = require('express-session');
var redisClient = redis.createClient();
var RedisStore  = require('connect-redis')(session);

module.exports = session({
    store: new RedisStore({
        client: redisClient
    }),
    ttl              : 60 * 60, 
    secret           : 'keyboard cat',
    resave           : false,
    saveUninitialized: true
}); 