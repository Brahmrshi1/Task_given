/**
 * Created by keltheceo on 7/31/15.
 */
const  MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("books");
  var myobj = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false
        },
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'H. G. Wells',
            read: false
        },
        {
            title: 'A Journey into the Center of the Earth',
            genre: 'Science Fiction',
            author: 'Jules Verne',
            read: false
        },
        {
            title: 'The Dark World',
            genre: 'Fantasy',
            author: 'Henry Kuttner',
            read: false
        },
        {
            title: 'The Wind in the Willows',
            genre: 'Fantasy',
            author: 'Kenneth Grahame',
            read: false
        },
        {
            title: 'Life On The Mississippi',
            genre: 'History',
            author: 'Mark Twain',
            read: false
        },
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        }
    ]
  dbo.collection("books").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});


// db.books.insert([
//     {
//         title: 'War and Peace',
//         genre: 'Historical Fiction',
//         author: 'Lev Nikolayevich Tolstoy',
//         read: false
//     },
//     {
//         title: 'Les Misérables',
//         genre: 'Historical Fiction',
//         author: 'Victor Hugo',
//         read: false
//     },
//     {
//         title: 'The Time Machine',
//         genre: 'Science Fiction',
//         author: 'H. G. Wells',
//         read: false
//     },
//     {
//         title: 'A Journey into the Center of the Earth',
//         genre: 'Science Fiction',
//         author: 'Jules Verne',
//         read: false
//     },
//     {
//         title: 'The Dark World',
//         genre: 'Fantasy',
//         author: 'Henry Kuttner',
//         read: false
//     },
//     {
//         title: 'The Wind in the Willows',
//         genre: 'Fantasy',
//         author: 'Kenneth Grahame',
//         read: false
//     },
//     {
//         title: 'Life On The Mississippi',
//         genre: 'History',
//         author: 'Mark Twain',
//         read: false
//     },
//     {
//         title: 'Childhood',
//         genre: 'Biography',
//         author: 'Lev Nikolayevich Tolstoy',
//         read: false
//     }
// ])