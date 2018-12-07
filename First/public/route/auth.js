
const express = require('express');
const passport = require('passport');
// const { Strategy} = require('passport-local');
const MongoClient=require('mongodb').MongoClient;
const authrouter=express.Router();

// Sign UP
authrouter.route('/signup')
.get((req,res)=>{
  res.render('signup');  
})
 .post((req,res)=>{
  
    req.body;
    //res.json(req.body);
    const {username , password} = req.body;
    const url = 'mongodb://localhost:27017';
    const dbname = 'taskdb';

    (async function  adduser() {
      let client;
      try{
        client = await MongoClient.connect(url);
        console.log("Connected perfectly");

        const db = client.db(dbname);
        const col = db.collection('users');
        const user = {username,password};
        const result = await col.insertOne(user)
        console.log(result);
        req.logIn(result.ops[0],()=>
     {
       res.redirect('/auth/signin');
     });
     req.logout(result.ops[0],()=>
     {
       res.redirect('/auth/signup');
     });
     
      }catch(err){
        console.log(err);
      }
      client.close();
    }());
          
 });


//  SignIN

 authrouter.route('/signin')
  .get((req,res)=>{
    res.render('signin');  
  })
   .post(passport.authenticate('local' ,{
    successRedirect:'/home',
    failureRedirect:'/auth/signup'
   }));



 authrouter.route('/profile')
//  .get((req,res)=>{
//   res.json(req.body);
// })
 .all((req,res,next)=>{
   if(req.user){
      next();
   }else{
     res.render('/');
   }
 })       
 .get((req,res)=>{
        res.json(req.user);
      });
module.exports = authrouter;