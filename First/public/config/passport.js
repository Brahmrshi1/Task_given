const passport = require('passport');
const {strategy} = require('passport-local');
require('./strategy/local.Strategy')(strategy);
module.exports = function pasportconfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

 
    
    // store user in session 
    passport.serializeUser((user,done)=>{
        done(null,user);
    });


    // Retrive user from user
    passport.deserializeUser((user,done)=>{
        done(null,user);
    });



}
