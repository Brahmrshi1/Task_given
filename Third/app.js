const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


const db = mongoose.connect('mongodb://localhost/books');
const Book = require('./models/bookModel');
const app = express();
const port = process.env.PORT || 3000;
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
// parse the body to json.


app.use(bodyParser.json());

const bookrouter = express.Router();

bookrouter.route('/BOOKS')
    .post(function (req, res) {
        var book = new Book(req.body);

        book.save();
        res.status(201).send(book);

    })

    .get(function (req, res) {
        const query = req.query;
        Book.find(query, function (err, books) {
            if (err) { res.status(500).send(err); }
        //   add link
            else {  
                   const returenBooks = [];
                   books.forEach(function(element,index,array){
                       const newBook=element.toJSON();
                       newBook.links={};
                       newBook.links.self='http//'+req.header.host +'/api/books'+ newBook._id;
                       returenBooks.push(newBook);
                   })
                   res.json(returenBooks); }
        })

    })



//   middelWare
bookrouter.use('/bookId', function (req, res, next) {
    Book.findById(req.params.bookId, function (err, book) {
        if (err) { res.status(500).send(err); }

        else if (book) {
            req.book = book;
            next();
        }

        else {
            res.status(404).send('No book found');
        }
    });
})



bookrouter.route('/Books/:bookId')
    .get(function (req, res) {


        // Befor MiddelWare
        //       Book.findById(req.params.bookId, function(err,book){
        //           if(err)
        //               res.status(500).send(err);
        //           else
        //               res.json(book);
        //       });

        // After MiddellWare
        res.json(req.book);
    })



    .put(function (req, res) {

        // Before MiddelWare 
        //     Book.findById(req.param.bookId,function(err,book){
        //           if(err)
        //           res.status(500).send(err,book);
        //           else
        //           {
        //               book.title=req.body.title;
        //               book.author=req.body.author;
        //               book.genere=req.body.genere;
        //               book.read=req.body.read;
        //               res.json(book)
        //           }
        //       })



        // After MiddelWare
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genere = req.body.genere;
        req.book.read = req.body.read;
        req.book.save(function(err){
            if (err) { res.status(500).send(err); }
            else {  res.json(books); }
        });

        res.json(req.book);


    })
    .patch(function(req,res){
       if(req.body._id)
       delete req.body._id;
        for (var p in req.body)
        {

            req.book[p] = req.body[p];
        }
        req.book.save(function(err){
            if (err) { res.status(500).send(err); }
            else {  res.json(books); }
        });

    })
    .delete(function(req,res){
         req.body.remove(function(err){
            if (err) { res.status(500).send(err); }
            else{ res.status(204).send(Removed)} 
         })
    });

app.get({
    "headers": { "content-type": "application/json" },
    "url": "http://httpbin.org/post",
    "body": JSON.stringify({
        "firstname": "Nic",
        "lastname": "Raboy"
    })
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));})
app.use('/api', bookrouter);

app.get('/', function (req, res) {
    res.send('Welcome to over work');
});


app.listen(port, function () {
    console.log('Gulp  is running on the ' + port);
})