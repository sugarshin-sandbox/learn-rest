// api mock server

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var bookID = 100;

function findBook(id) {
  for (var i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      return books[i];
    }
  }
  return null;
}

function removeBook(id) {
  var bookIndex = 0;
  for (var i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      bookIndex = i;
    }
  }
  books.splice(bookIndex, i);
}

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser());

var books = [
  {
    id: 98,
    author: 'tests1',
    title: 'The title',
    year: 1977
  },
  {
    id: 99,
    author: 'tests2',
    title: 'The title',
    year: 1978
  }
];

app.get('/books', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  console.log('In GET function');
  res.json(books);
});

app.get('/books/:id', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  console.log('Getting a book with id ' + req.params.id);
  var book = findBook(parseInt(req.params.id, 10));
  if (book === null) {
    res.send(404);
  } else {
    res.json(book);
  }
});

app.post('/books/', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  var book = req.body;
  console.log('Saving book with the following structure ' + JSON.stringify(book));
  book.id = bookID++;
  books.push(book);
  res.json(book);
});

app.put('/books/:id', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  var book = req.body;
  console.log('Update Book ' + JSON.stringify(book));
  var currentBook = findBook(parseInt(req.params.id, 10));
  if (currentBook === null) {
    res.send(404);
  } else {
    currentBook.title = book.title;
    currentBook.year = book.year;
    currentBook.author = book.author;
    res.json(book);
  }
});

app.delete('/books/:id', function(req, res) {
  console.log('calling delete');
  res.header('Access-Control-Allow-Origin', '*');
  var book = findBook(parseInt(req.params.id, 10));
  if (book === null) {
    console.log('Could not find book');
    res.send(404);
  } else {
    console.log('Deleting ' + req.params.id);
    removeBook(parseInt(req.params.id, 10));
    res.send(200);
  }
});

app.listen(8080);
