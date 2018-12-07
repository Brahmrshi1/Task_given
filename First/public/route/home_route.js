
const express = require('express');
const homerouter = express.Router();
const mongodbClient = require('mongodb').mongodbClient; 

homerouter.route('/home')
 
.all((req,res,next)=>{
  if(req.user){
    res.render('home', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'},{ link: '/auth/signup', title: 'Signout'} ] });
  }else{
    res.render('home', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'}, {link:'/auth/signin',title:'Sign in'}, {link:'/auth/signup',title:'Sign up'} ] });
  }
})


// .get((req, res) => {
  //   res.render('home', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'}, {link:'/auth/signin',title:'Sign in'}, {link:'/auth/signup',title:'Sign up'} ] });
  //   // res.send('Welcome to home site');
  // });
module.exports = homerouter;