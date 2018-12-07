const passport = require('passport');
const { Strategy} = require('passport-local');

const MongoClient=require('mongodb').MongoClient;

module.exports = function localstrategy(){
 passport.use(new Strategy({
     
     usernameField:'username',
     passwordField:'password'
 }, (username, password, done)=>{
     
    const url = 'mongodb://localhost:27017';
    const dbname = 'mydb';

    (async function  adduser() {
      let client;
      try{
        client = await MongoClient.connect(url);
        console.log("Connected perfectly");

        const db = client.db(dbname);
        const col = db.collection('users');
       
        const user = await col.findOne({username}); 
        if(user.password == password)
        {
            done(null,user);

        }else{
            done(null,false);
        }
        
      }
        catch(err){
            console.log(err.stack);

          }

          client.close();
        }());
    
    }

    ));
          
};