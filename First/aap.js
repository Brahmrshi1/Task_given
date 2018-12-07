const express = require('express');
const chalk = require('chalk');
// const path = require('path');
const port = process.env.PORT || 3000;
const body_parser = require('body-parser');
const passport = require('passport');
const cookie_parser=require('cookie-parser');
const session = require('express-session');

const dbconfig = require('./public/config/database_config');




const homerouter = require('./public/route/home_route');
const authroute = require('./public/route/auth');



const app= express();

app.use(body_parser.json()); 
app.use(body_parser.urlencoded({extended:false}));
app.use(cookie_parser());
app.use(session({secret:'exjs'}));
require('./public/config/passport')(app);


app.set('views', './view');
app.set('view engine', 'ejs');


app.use('/', homerouter);
app.use('/auth', authroute);


app.get('/',(req,res)=>
{   
    res.render('main')
   
})

app.listen(port, () => {
    console.log(`App is running on${chalk.green(port)}`);
  });
   

